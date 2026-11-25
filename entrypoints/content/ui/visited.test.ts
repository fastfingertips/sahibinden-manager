import { describe, expect, it } from 'vitest';
import { extractFirstTimestamp, extractLastTimestamp, extractVisitCount } from './visited';

describe('entrypoints/content/ui/visited timestamp helpers', () => {
  it('handles legacy numeric timestamps', () => {
    expect(extractFirstTimestamp(1700000000000)).toBe(1700000000000);
    expect(extractLastTimestamp(1700000000000)).toBe(1700000000000);
    expect(extractVisitCount(1700000000000)).toBe(1);
  });

  it('extracts structured first/last timestamps and visit count', () => {
    const entry = {
      firstVisitedAt: 1700000000000,
      lastVisitedAt: 1700005000000,
      visitCount: 4,
    };
    expect(extractFirstTimestamp(entry)).toBe(1700000000000);
    expect(extractLastTimestamp(entry)).toBe(1700005000000);
    expect(extractVisitCount(entry)).toBe(4);
  });

  it('falls back to visitedAt and defaults for malformed values', () => {
    expect(extractFirstTimestamp({ visitedAt: 1700001234000 })).toBe(1700001234000);
    expect(extractLastTimestamp({ visitedAt: 1700001234000 })).toBe(1700001234000);
    expect(extractFirstTimestamp(null)).toBeUndefined();
    expect(extractLastTimestamp({})).toBeUndefined();
    expect(extractVisitCount(undefined)).toBe(1);
  });
});
