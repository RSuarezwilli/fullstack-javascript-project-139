import Filter from 'leo-profanity';

// Agrega palabras en español
Filter.add([
  'groseria1',
  'groseria2',
  'insulto',
  'palabramala',
]);

export const hasProfanity = (text) => Filter.isProfane(text);

export const cleanProfanity = (text) => Filter.clean(text);
