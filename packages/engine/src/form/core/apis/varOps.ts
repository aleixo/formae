export const concatenate = (a, b) => {
  return a + b;
};

export const add = (a, b) => {
  return ((parseInt(a) || 0) + (parseInt(b) || 0)).toString();
};

export const subtract = (a, b) => {
  return parseInt(a) - parseInt(b);
};

export const replaceAll = (value: string, searchValue: string, replaceValue: string) => {
  return value.replace(new RegExp(searchValue, 'g'), replaceValue);
};
