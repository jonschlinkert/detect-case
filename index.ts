export const WORD_SPLIT_REGEX_STRICT = /([\p{Lu}]+[\p{Ll}]*|[\p{Ll}]+|[\p{N}]+)/gu;
export const WORD_SPLIT_REGEX = /([\p{Lu}(.,-]+[\p{Ll})]*|[\p{Ll}()]+|[\p{N}()]+)/gu;

export const splitString = (input: unknown, strict = true): string[] => {
  const regex = strict ? WORD_SPLIT_REGEX_STRICT : WORD_SPLIT_REGEX;
  return input ? (String(input).match(regex) || []).filter(Boolean) : [];
};

const isPascalCase = (input: string): boolean => {
  return /^([A-Z][a-zA-Z]*)+$/.test(input);
};

export const detectCase = (input: string): string => {
  if (typeof input !== 'string') {
    throw new TypeError('Expected input to be a string');
  }

  if (!input) return 'unknown';
  if (!/[a-z]/i.test(input)) return 'unknown';

  if (input.includes('_')) {
    if (/^([A-Z][A-Z0-9_]+)+$/.test(input)) return 'uppersnake';
    if (/^([a-z][a-z0-9_]+)+$/.test(input)) return 'snakecase';
    return 'mixedcase';
  }

  if (input.includes('-')) {
    if (/^([a-z][a-z0-9-]+)+$/.test(input)) return 'kebabcase';
    return 'mixedcase';
  }

  if (/^[a-z ]+$/.test(input)) return 'lowercase';
  if (/^[A-Z][A-Z0-9_]*$/.test(input)) return 'uppercase';

  const words = input.split(/\s+/);
  if (words.length > 1 && words.every((word) => isPascalCase(word))) {
    return 'titlecase';
  }

  // The exception to previous is when the first word is a number
  // making the second word a candidate for pascal case
  if (words.length > 1 && (/^[0-9]+$/.test(words[0]) && isPascalCase(words[1]))) {
    return 'titlecase';
  }

  if (words.length > 1 && isPascalCase(words[0])) {
    return 'sentencecase';
  }

  if (isPascalCase(input)) return 'pascalcase';
  if (/^(?:[0-9]+\s+)?(?:[A-Z]\w*\s+)+$/.test(input)) return 'titlecase';
  if (/^([a-z][a-z0-9]*[A-Z]+[a-z0-9]*)+$/.test(input)) return 'camelcase';
  if (/[.!?;:,](?!(?:\s|$))/.test(input)) return 'unknown';
  return 'mixedcase';
};

export default detectCase;
