import { readdir, readFile, stat, writeFile } from 'node:fs/promises';
import { relative, resolve, sep } from 'node:path';

const root = process.cwd();
const sourceRoots = [resolve(root, 'entrypoints'), resolve(root, 'utils')];
const ratchetPath = resolve(root, 'tools/architecture-ratchet.json');
const extensions = new Set(['.ts', '.tsx', '.css']);
const files = [];

const isUpdateRatchet = process.argv.includes('--update-ratchet');
const isAllowNew = process.argv.includes('--allow-new');

let ratchet = {
  limits: {
    component: 400,
    hook: 400,
    ui: 450,
    style: 450,
    content: 450,
    shared: 400,
  },
  maxFileLines: {},
};

try {
  const raw = await readFile(ratchetPath, 'utf8');
  const parsed = JSON.parse(raw);
  ratchet = {
    ...ratchet,
    ...parsed,
    limits: { ...ratchet.limits, ...parsed.limits },
    maxFileLines: { ...parsed.maxFileLines },
  };
} catch {
  // Ratchet dosyasi yoksa varsayilan limitlerle devam et
}

async function collect(directory) {
  for (const entry of await readdir(directory)) {
    const fullPath = resolve(directory, entry);
    const info = await stat(fullPath);
    if (info.isDirectory()) {
      await collect(fullPath);
    } else if (extensions.has(fullPath.slice(fullPath.lastIndexOf('.')))) {
      if (!fullPath.endsWith('.test.ts') && !fullPath.endsWith('.test.tsx')) {
        files.push(fullPath);
      }
    }
  }
}

function getLayer(file) {
  const rel = relative(root, file).split(sep);
  if (rel[0] === 'entrypoints' && rel[1] === 'popup') {
    if (rel[2] === 'components') return 'component';
    if (rel[2] === 'hooks') return 'hook';
    return 'component';
  }
  if (rel[0] === 'entrypoints' && rel[1] === 'content') {
    if (rel[2] === 'ui') return 'ui';
    if (rel[2] === 'styles') return 'style';
    return 'content';
  }
  return 'shared';
}

for (const dir of sourceRoots) {
  await collect(dir);
}

const seenFiles = new Set();
const violations = [];
const improvements = [];
const exceptions = [];
const updatedMaxFileLines = { ...ratchet.maxFileLines };

for (const file of files) {
  const source = await readFile(file, 'utf8');
  const relPath = relative(root, file).replace(/\\/g, '/');
  seenFiles.add(relPath);

  const actual = source.split(/\r?\n/).length;
  const layer = getLayer(file);
  const standardLimit = ratchet.limits[layer] || 450;
  const lockedCap = ratchet.maxFileLines[relPath];
  const hint = 'Dosyayi daha kucuk modullere bolun.';

  if (isUpdateRatchet) {
    if (actual <= standardLimit) {
      delete updatedMaxFileLines[relPath];
    } else if (lockedCap !== undefined && actual <= lockedCap) {
      updatedMaxFileLines[relPath] = actual;
    } else if (isAllowNew) {
      updatedMaxFileLines[relPath] = actual;
      exceptions.push(
        `[file-lines] ${relPath} ${lockedCap === undefined ? 'eklendi' : `${lockedCap} ->`} ${actual} satir (--allow-new).`,
      );
    } else {
      violations.push(
        lockedCap === undefined
          ? `[file-lines] ${relPath} ${actual} satir (butce: ${standardLimit}). Yeni dosyalar ratchet listesine eklenemez. ${hint}`
          : `[file-lines] ${relPath} kilitli sinir ${lockedCap} satirdan ${actual} satira buyudu (+${actual - lockedCap}). ${hint}`,
      );
    }
    continue;
  }

  if (lockedCap !== undefined) {
    if (actual > lockedCap) {
      violations.push(
        `[file-lines] ${relPath} kilitli sinir ${lockedCap} satirdan ${actual} satira buyudu (+${actual - lockedCap}). ${hint}`,
      );
    } else if (actual <= standardLimit) {
      delete updatedMaxFileLines[relPath];
      improvements.push(
        `${relPath} (${lockedCap} -> ${actual} satir, ${standardLimit} limitinin altina indi)`,
      );
    } else if (lockedCap - actual >= 15) {
      updatedMaxFileLines[relPath] = actual;
      improvements.push(`${relPath} (${lockedCap} -> ${actual} satir)`);
    }
  } else if (actual > standardLimit) {
    violations.push(
      `[file-lines] ${relPath} ${actual} satir ile ${layer} katmani butcesini (${standardLimit}) asti. ${hint}`,
    );
  }
}

// Silinen dosyalari ratchet listesinden temizle
for (const key of Object.keys(updatedMaxFileLines)) {
  if (!seenFiles.has(key)) {
    delete updatedMaxFileLines[key];
  }
}

if (isUpdateRatchet && violations.length === 0) {
  const nextRatchet = {
    limits: ratchet.limits,
    maxFileLines: Object.fromEntries(
      Object.entries(updatedMaxFileLines).sort(([a], [b]) => a.localeCompare(b)),
    ),
  };
  await writeFile(ratchetPath, `${JSON.stringify(nextRatchet, null, 2)}\n`, 'utf8');
  console.log(
    `OK: Ratchet guncellendi (${Object.keys(nextRatchet.maxFileLines).length} kilitli dosya).`,
  );
  for (const ex of exceptions) console.log(`UYARI: ${ex}`);
  process.exit(0);
}

if (violations.length > 0) {
  console.error('\n[Mimari Denetim Hatasi]');
  for (const v of violations) {
    console.error(`- ${v}`);
  }
  console.error('');
  process.exit(1);
}

console.log(
  `OK: Mimari denetim gecti (${files.length} dosya tarandi, ${Object.keys(ratchet.maxFileLines).length} kilitli taban).`,
);

if (improvements.length > 0) {
  console.log('\n[Iyilesme Tespit Edildi - Ratchet sikilastirilabilir]');
  for (const imp of improvements) {
    console.log(`- ${imp}`);
  }
  console.log('Guncellemek icin: npm run architecture:ratchet:update\n');
}
