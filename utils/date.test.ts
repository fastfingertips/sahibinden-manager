import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { formatDate, formatTimeAgo, parseTurkishDate } from './date';

describe('utils/date', () => {
  describe('formatDate', () => {
    it('formats timestamp as DD.MM.YYYY HH:mm', () => {
      const ts = new Date(2026, 3, 5, 9, 7).getTime(); // 05.04.2026 09:07
      expect(formatDate(ts)).toBe('05.04.2026 09:07');
    });

    it('pads single digit day, month, hour, and minute values', () => {
      const ts = new Date(2025, 0, 1, 0, 5).getTime();
      expect(formatDate(ts)).toBe('01.01.2025 00:05');
    });
  });

  describe('formatTimeAgo', () => {
    const baseNow = new Date(2026, 5, 15, 12, 0, 0).getTime();

    beforeEach(() => {
      vi.useFakeTimers();
      vi.setSystemTime(baseNow);
    });

    afterEach(() => {
      vi.useRealTimers();
    });

    it('returns Az önce for timestamps under 1 minute or in the future', () => {
      expect(formatTimeAgo(baseNow)).toBe('Az önce');
      expect(formatTimeAgo(baseNow - 30 * 1000)).toBe('Az önce');
      expect(formatTimeAgo(baseNow + 10 * 1000)).toBe('Az önce');
    });

    it('returns minutes, hours, yesterday, days, months, and years accurately', () => {
      expect(formatTimeAgo(baseNow - 5 * 60 * 1000)).toBe('5 dk önce');
      expect(formatTimeAgo(baseNow - 3 * 60 * 60 * 1000)).toBe('3 saat önce');
      expect(formatTimeAgo(baseNow - 24 * 60 * 60 * 1000)).toBe('Dün');
      expect(formatTimeAgo(baseNow - 10 * 24 * 60 * 60 * 1000)).toBe('10 gün önce');
      expect(formatTimeAgo(baseNow - 65 * 24 * 60 * 60 * 1000)).toBe('2 ay önce');
      expect(formatTimeAgo(baseNow - 400 * 24 * 60 * 60 * 1000)).toBe('1 yıl önce');
    });
  });

  describe('parseTurkishDate', () => {
    it('parses Turkish date strings without time', () => {
      const parsed = parseTurkishDate('15 Mayıs 2026');
      expect(parsed).toBe(new Date(2026, 4, 15, 0, 0, 0).getTime());
    });

    it('parses Turkish date strings with time and Turkish characters', () => {
      const parsed = parseTurkishDate('03 Şubat 2026, 14:35:20');
      expect(parsed).toBe(new Date(2026, 1, 3, 14, 35, 20).getTime());

      const august = parseTurkishDate('28 Ağustos 2025 08:15');
      expect(august).toBe(new Date(2025, 7, 28, 8, 15, 0).getTime());
    });

    it('falls back to ISO date parsing and returns null for invalid input', () => {
      expect(parseTurkishDate('2026-04-20T10:00:00Z')).toBe(Date.parse('2026-04-20T10:00:00Z'));
      expect(parseTurkishDate('')).toBeNull();
      expect(parseTurkishDate('geçersiz tarih')).toBeNull();
    });
  });
});
