import { extractEmailsFromText } from "../common"

describe('extractEmailsFromText', () => {
  it('should extract a single email preceded by "@"', () => {
    const text = 'Contact me at @example@example.com for more info.';
    const result = extractEmailsFromText(text);
    expect(result).toEqual(['example@example.com']);
  });

  it('should extract multiple emails preceded by "@"', () => {
    const text = 'Emails: @first@example.com @second@example.com';
    const result = extractEmailsFromText(text);
    expect(result).toEqual(['first@example.com', 'second@example.com']);
  });

  it('should not extract invalid emails', () => {
    const text = 'Invalid emails: @example@com @example.com';
    const result = extractEmailsFromText(text);
    expect(result).toEqual([]);
  });

  it('should handle text without any emails', () => {
    const text = 'No emails here!';
    const result = extractEmailsFromText(text);
    expect(result).toEqual([]);
  });

  it('should handle empty string input', () => {
    const text = '';
    const result = extractEmailsFromText(text);
    expect(result).toEqual([]);
  });

  it('should ignore emails not preceded by "@"', () => {
    const text = 'Emails: first@example.com @second@example.com';
    const result = extractEmailsFromText(text);
    expect(result).toEqual(['second@example.com']);
  });
});