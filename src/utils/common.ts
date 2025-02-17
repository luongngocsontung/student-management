import { isEmail } from 'class-validator';

export const extractEmailsFromText = (text: string): string[] => {
  return text
    .split(' ')
    .filter((s) => s[0] === '@' && isEmail(s.slice(1)))
    .map((s) => s.slice(1));
};
