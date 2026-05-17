import { describe, it, expect, vi } from 'vitest';
import { generateSummary, extractActionItems, suggestTitle } from './ai';

// Mock groq-sdk
vi.mock('groq-sdk', () => {
  const MockGroq = class {
    chat = {
      completions: {
        create: vi.fn().mockImplementation(async (opts) => {
          const content = opts.messages[1].content;
          
          if (content.includes('Summarize')) {
            return {
              choices: [{ message: { content: 'This is a mocked summary.' } }],
              usage: { total_tokens: 10 }
            };
          }
          
          if (content.includes('Extract all action items')) {
            // Return malformed JSON for testing resilience, or valid JSON based on input
            if (content.includes('malformed')) {
              return {
                choices: [{ message: { content: 'Here are your actions:\n[\n"Task 1"\n]' } }],
                usage: { total_tokens: 15 }
              };
            }
            return {
              choices: [{ message: { content: '["Action 1", "Action 2"]' } }],
              usage: { total_tokens: 20 }
            };
          }
          
          if (content.includes('Suggest 3 concise')) {
            if (content.includes('invalid')) {
              return {
                choices: [{ message: { content: 'Just a string, not JSON' } }],
                usage: { total_tokens: 5 }
              };
            }
            return {
              choices: [{ message: { content: '{"primary": "Mocked Title", "alternatives": ["Alt 1", "Alt 2"]}' } }],
              usage: { total_tokens: 25 }
            };
          }
          
          return { choices: [{ message: { content: '' } }], usage: { total_tokens: 0 } };
        })
      }
    };
  };
  return { default: MockGroq };
});

describe('AI Library', () => {
  
  describe('generateSummary', () => {
    it('throws error if content is too short (< 50 words)', async () => {
      const shortContent = 'This is a short note with only a few words.';
      await expect(generateSummary(shortContent)).rejects.toThrow('Note is too short to summarize');
    });

    it('returns summary for valid length content', async () => {
      // Generate 50+ words
      const longContent = Array(60).fill('word').join(' ');
      const result = await generateSummary(longContent);
      expect(result.summary).toBe('This is a mocked summary.');
      expect(result.tokensUsed).toBe(10);
    });
  });

  describe('extractActionItems', () => {
    it('extracts action items from valid JSON output', async () => {
      const result = await extractActionItems('Some content');
      expect(result.actionItems).toEqual(['Action 1', 'Action 2']);
    });

    it('handles malformed JSON wrapped in text', async () => {
      const result = await extractActionItems('malformed text with task');
      expect(result.actionItems).toEqual(['Task 1']);
    });
  });

  describe('suggestTitle', () => {
    it('suggests titles from valid JSON', async () => {
      const result = await suggestTitle('Some note content');
      expect(result.suggestedTitle).toBe('Mocked Title');
      expect(result.alternatives).toEqual(['Alt 1', 'Alt 2']);
    });

    it('falls back to Untitled Note if JSON parsing fails', async () => {
      const result = await suggestTitle('invalid response');
      expect(result.suggestedTitle).toBe('Untitled Note');
      expect(result.alternatives).toEqual([]);
    });
  });

});
