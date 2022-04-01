const gitCommand = require('./git/index');
const transform = require('./transform/index');

module.exports = function (context) {
  gitCommand(context);
  transform(context);
};
