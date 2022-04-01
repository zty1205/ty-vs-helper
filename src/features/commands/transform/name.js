const { splitWords } = require('./util');
const { baseTransform } = require('./util');

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

exports.transformSnakeUpper = () => baseTransform(transSnakeUpper);
exports.transformSnake = () => baseTransform(transSnake);
exports.transformPascal = () => baseTransform(transPascal);
exports.transformCamelCase = () => baseTransform(transCamelCase);
