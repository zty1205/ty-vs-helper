const { transSnakeUpper, transSnake, transPascal, transCamelCase } = require('../../../util/word');
const { baseTransform } = require('./util');

exports.transformSnakeUpper = () => baseTransform(transSnakeUpper);
exports.transformSnake = () => baseTransform(transSnake);
exports.transformPascal = () => baseTransform(transPascal);
exports.transformCamelCase = () => baseTransform(transCamelCase);
