const { registerDefinitionProvider, registerHoverProvider } = require('../../util');
const { JDSelector, JDProvider } = require('./jump/dependencies');
const { ImportSelector, ImportProvider, ImportHoverProvider } = require('./jump/import');

module.exports = function (context) {
  registerDefinitionProvider(context, JDSelector, JDProvider);
  registerDefinitionProvider(context, ImportSelector, ImportProvider);
  registerHoverProvider(context, ImportSelector, ImportHoverProvider);
};
