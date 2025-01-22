export const generateRandomStringArray = (maxCount, maxChars) => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const result = [];
  let s = '';

  for (let j = 0; j < maxCount; j++) {
    for (let i = 0; i < maxChars; i++) {
      s += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    result.push(s);
    s = '';
  }

  return result;
};

export const generateRandomEasyStringArray = (maxCount, maxChars) => {
  const characters = 'ABCDEFGHIJ';
  const result = [];
  let s = '';

  for (let j = 0; j < maxCount; j++) {
    for (let i = 0; i < maxChars; i++) {
      s += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    result.push(s);
    s = '';
  }

  return result;
};

export const containsNot = (str: string) => {
  return str.toUpperCase().includes('NOT');
};

export const removeNotFromString = (str: string) => {
  if (containsNot(str)) {
    return str.replace(/^NOT\s*/i, '');
  }

  return str;
};
