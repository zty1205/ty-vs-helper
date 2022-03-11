const vscode = require('vscode');
const deleteLocalBranch = require('./features/deleteLocalBranch');
const jumpDependencies = require('./features/jumpDependencies');

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
  deleteLocalBranch(context);
  jumpDependencies(context);
}

function deactivate() {}

module.exports = {
  activate,
  deactivate
};
