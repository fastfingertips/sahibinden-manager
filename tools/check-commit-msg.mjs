import { readFileSync } from 'node:fs';

const msgPath = process.argv[2];

if (!msgPath) {
  console.error('Hata: Commit mesaji dosya yolu gerekli.');
  process.exit(1);
}

const rawContent = readFileSync(msgPath, 'utf-8');
const lines = rawContent.split(/\r?\n/);
const subjectLine = lines.find((line) => line.trim().length > 0 && !line.startsWith('#'))?.trim();

if (!subjectLine) {
  console.error('Hata: Commit mesaji bos olamaz.');
  process.exit(1);
}

// Otomatik olusturulan merge veya revert commitlerini atla
if (subjectLine.startsWith('Merge ') || subjectLine.startsWith('Revert ')) {
  process.exit(0);
}

const MAX_LENGTH = 62;
const CONVENTIONAL_RE =
  /^(feat|fix|refactor|docs|style|test|chore|ci|build|perf)(\([a-z0-9-]+\))?!?: .+/;

const errors = [];

if (subjectLine.length > MAX_LENGTH) {
  errors.push(
    `Commit basligi en fazla ${MAX_LENGTH} karakter olmalidir (mevcut: ${subjectLine.length}, ${subjectLine.length - MAX_LENGTH} karakter kisaltin).`,
  );
}

if (!CONVENTIONAL_RE.test(subjectLine)) {
  errors.push(
    'Commit basligi Conventional Commits formatinda olmalidir (orn: "feat: ...", "fix(popup): ...", "chore: ...").',
  );
}

if (errors.length > 0) {
  console.error('\n[Commit Mesaji Hatasi]');
  for (const err of errors) {
    console.error(`- ${err}`);
  }
  console.error(`\nGirdiginiz mesaj:\n"${subjectLine}"\n`);
  process.exit(1);
}

console.log(`OK: Commit mesaji gecerli (${subjectLine.length}/${MAX_LENGTH} karakter).`);
