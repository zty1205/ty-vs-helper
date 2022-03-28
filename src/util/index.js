const vscode = require('vscode');

exports.getProjectPath = function () {
  const workspaceFolders = vscode.workspace.workspaceFolders;
  if (!workspaceFolders.length) {
    vscode.window.showErrorMessage('获取项目目录异常');
    return;
  }
  let workspaceFolder = workspaceFolders[0];
  return workspaceFolder.uri.path;
};
