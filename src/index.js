const vscode = require('vscode');
const deleteLocalBranch = require('./features/deleteLocalBranch');
const jumpDependencies = require('./features/jumpDependencies');
const gitPush = require('./features/gitPush');
const transform = require('./features/transform');

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
  deleteLocalBranch(context);
  jumpDependencies(context);
  gitPush(context);
  transform(context);
}

function deactivate() {}

module.exports = {
  activate,
  deactivate
};
