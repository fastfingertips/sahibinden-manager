import { describe, expect, it } from 'vitest';
import { getHighResUrl } from './utils';

describe('entrypoints/content/utils', () => {
  describe('getHighResUrl', () => {
    it('returns empty string for empty input', () => {
      expect(getHighResUrl('')).toBe('');
    });

    it('replaces known thumbnail prefixes with x16_', () => {
      expect(getHighResUrl('https://i0.shbdn.com/photos/12/34/56/thmb_123456.jpg')).toBe(
        'https://i0.shbdn.com/photos/12/34/56/x16_123456.jpg',
      );
      expect(getHighResUrl('https://i0.shbdn.com/photos/12/34/56/x5_123456.jpg')).toBe(
        'https://i0.shbdn.com/photos/12/34/56/x16_123456.jpg',
      );
      expect(getHighResUrl('https://i0.shbdn.com/photos/12/34/56/big_123456.jpg')).toBe(
        'https://i0.shbdn.com/photos/12/34/56/x16_123456.jpg',
      );
      expect(getHighResUrl('https://i0.shbdn.com/photos/12/34/56/x2_123456.jpg')).toBe(
        'https://i0.shbdn.com/photos/12/34/56/x16_123456.jpg',
      );
    });

    it('keeps x16_ prefix idempotent and prepends when missing', () => {
      expect(getHighResUrl('https://i0.shbdn.com/photos/12/34/56/x16_123456.jpg')).toBe(
        'https://i0.shbdn.com/photos/12/34/56/x16_123456.jpg',
      );
      expect(getHighResUrl('https://i0.shbdn.com/photos/12/34/56/123456.jpg')).toBe(
        'https://i0.shbdn.com/photos/12/34/56/x16_123456.jpg',
      );
    });
  });
});
