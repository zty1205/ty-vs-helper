const vscode = require('vscode');
const commands = require('./features/commands');
const languages = require('./features/languages');

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
  commands(context);
  languages(context);
}

function deactivate() {}

module.exports = {
  activate,
  deactivate
};
