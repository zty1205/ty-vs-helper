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

exports.registerCommand = function (context, name, transformFunction) {
  const disposable = vscode.commands.registerCommand(`ty-helper.${name}`, function (dispose) {
    transformFunction.apply(this, [dispose, context]);
  });

  context.subscriptions.push(disposable);
};

exports.registerCommand = function (context, name, transformFunction) {
  context.subscriptions.push(vscode.commands.registerCommand(`ty-helper.${name}`, transformFunction));
};

exports.registerDefinitionProvider = function (context, selector, provider) {
  context.subscriptions.push(vscode.languages.registerDefinitionProvider(selector, provider));
};

exports.getConfiguration = function (key = '') {
  return vscode.workspace.getConfiguration().get(key);
};

exports.buildSHCommand = function (array = [], sp = ';') {
  return array.join(sp);
};
