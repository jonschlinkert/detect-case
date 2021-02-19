'use strict';

module.exports = input => {
  if (input.includes('_') && /^([A-Z][A-Z0-9_]+)+$/.test(input)) return 'uppersnake';
  if (input.includes('_') && /^([a-z][a-z0-9_]+)+$/.test(input)) return 'snakecase';
  if (/^[a-z0-9_]+$/.test(input)) return 'lowercase';
  if (/^[A-Z][A-Z0-9_]*$/.test(input)) return 'uppercase';
  if (/^([A-Z][a-z0-9_]*[A-Z]*){2,}$/.test(input)) return 'pascalcase';
  if (/^([a-z][a-z0-9_]*[A-Z][a-z0-9_]*)+$/.test(input)) return 'camelcase';
  if (/^[A-Z][a-z]*$/.test(input)) return 'titlecase';
  if (/^[A-Z][a-z0-9_]*$/.test(input)) return 'mixedcase';
  return 'unknown';
};
