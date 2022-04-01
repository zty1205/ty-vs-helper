const { registerDefinitionProvider } = require('../../util');
const { JDSelector, JDProvider } = require('./jump/dependencies');

module.exports = function (context) {
  registerDefinitionProvider(context, JDSelector, JDProvider);
};
