function splitWords(text) {
  return text.match(/([^\s\-_A-Z]+)|([A-Z]+[^\s\-_A-Z]*)/g) || [];
}

function transSnakeUpper(text) {
  return splitWords(text)
    .map((x) => x.toUpperCase())
    .join('_');
}

function transSnake(text) {
  return splitWords(text).join('_');
}

function transPascal(text) {
  return splitWords(text)
    .map((word) => word[0].toUpperCase() + word.slice(1).toLowerCase())
    .join('');
}

function transCamelCase(text) {
  const pascal = transPascal(text);
  return pascal[0].toLowerCase() + pascal.slice(1);
}

module.exports = {
  splitWords,
  transSnakeUpper,
  transSnake,
  transPascal,
  transCamelCase
};
