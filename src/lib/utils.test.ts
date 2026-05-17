import { describe, it, expect } from 'vitest';
import { generateShareId } from './share';
import { buildWeeklySummary } from './insights';
import { generatePasswordResetToken } from './utils';

describe('Utility Functions', () => {

  describe('generateShareId', () => {
    it('generates a 12-character alphanumeric string', () => {
      const shareId = generateShareId();
      expect(shareId).toHaveLength(12);
      expect(shareId).toMatch(/^[a-z0-9]+$/);
    });

    it('generates unique IDs', () => {
      const id1 = generateShareId();
      const id2 = generateShareId();
      expect(id1).not.toBe(id2);
    });
  });

  describe('buildWeeklySummary', () => {
    it('handles positive trend', () => {
      const summary = buildWeeklySummary(15, 20);
      expect(summary).toBe("You've created 15 notes this week, a 20% increase from last week.");
    });

    it('handles negative trend', () => {
      const summary = buildWeeklySummary(10, -10);
      expect(summary).toBe("You've created 10 notes this week. You were slightly more active last week.");
    });

    it('handles flat trend', () => {
      const summary = buildWeeklySummary(5, 0);
      expect(summary).toBe("You've created 5 notes this week, maintaining your pace from last week.");
    });
  });

  describe('generatePasswordResetToken', () => {
    it('generates a token and 1-hour expiry', () => {
      const { token, expiresAt } = generatePasswordResetToken();
      expect(typeof token).toBe('string');
      expect(token.length).toBeGreaterThan(16);
      
      const oneHourFromNow = Date.now() + 60 * 60 * 1000;
      // Allow 1 second variance for test execution time
      expect(expiresAt.getTime()).toBeCloseTo(oneHourFromNow, -3);
    });
  });

});
