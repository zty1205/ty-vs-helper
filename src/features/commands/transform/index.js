const { registerCommand } = require('../../../util');
const { transformDecodeURIComponent, transformEncodeURIComponent } = require('./url');
const { transformSnakeUpper, transformCamelCase, transformPascal, transformSnake } = require('./name');

module.exports = function (context) {
  registerCommand(context, 'EncodeURIComponent', transformEncodeURIComponent);
  registerCommand(context, 'DecodeURIComponent', transformDecodeURIComponent);
  registerCommand(context, 'SnakeUpper', transformSnakeUpper);
  registerCommand(context, 'Snake', transformSnake);
  registerCommand(context, 'Pascal', transformPascal);
  registerCommand(context, 'CamelCase', transformCamelCase);
};
