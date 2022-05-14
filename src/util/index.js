const vscode = require('vscode');

function getProjectPath() {
  const uri = getProjectUri();
  return uri ? uri.path : null;
}

function getProjectUri() {
  const workspaceFolders = vscode.workspace.workspaceFolders;
  if (!workspaceFolders.length) {
    vscode.window.showErrorMessage('获取项目目录异常');
    return;
  }
  let workspaceFolder = workspaceFolders[0];
  return workspaceFolder.uri;
}

// 分割字符串为多个单词
// 分割标准 - _ 或 遇到大写字母
function registerCommand(context, name, transformFunction) {
  context.subscriptions.push(vscode.commands.registerCommand(`ty-helper.${name}`, transformFunction));
}

function registerDefinitionProvider(context, selector, provider) {
  context.subscriptions.push(vscode.languages.registerDefinitionProvider(selector, provider));
}

function getConfiguration(key = '') {
  return vscode.workspace.getConfiguration().get(key);
}

function buildSHCommand(array = [], sp = ';') {
  return array.join(sp);
}

function registerHoverProvider(context, selector, provider) {
  context.subscriptions.push(vscode.languages.registerHoverProvider(selector, provider));
}

module.exports = {
  getProjectPath,
  getProjectUri,
  registerCommand,
  registerDefinitionProvider,
  getConfiguration,
  buildSHCommand,
  registerHoverProvider
};
