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

// 分割字符串为多个单词
// 分割标准 - _ 或 遇到大写字母
exports.splitWords = function (text) {
  return text.match(/([^\s\-_A-Z]+)|([A-Z]+[^\s\-_A-Z]*)/g) || [];
};
