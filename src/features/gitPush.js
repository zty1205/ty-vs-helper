const vscode = require('vscode');
const path = require('path');
var child = require('child_process');
const utils = require('../util/index');
const { COMMITIZEN } = require('../constants');

async function gitPush() {
  const needCommitizen = vscode.workspace.getConfiguration().get('ty-helper.GitPush.commitizen');

  let commit = 'feat';
  if (needCommitizen) {
    let choose = await vscode.window.showQuickPick(COMMITIZEN);
    if (!choose) return;
    commit = choose.split(':')[0];
  }

  let gitMsg = await vscode.window.showInputBox({
    title: 'git提交',
    value: `${commit}: `,
    placeHolder: '请输入',
    prompt: needCommitizen ? `默认携带 ${commit}` : undefined
  });
  if (!gitMsg) return;

  if (needCommitizen && gitMsg.indexOf(commit) < 0) {
    gitMsg = `${commit}: ${gitMsg}`;
  }

  const rootPath = utils.getProjectPath();

  try {
    const result = child.execSync(`cd ${rootPath}\ngit add .\ngit commit -m '${gitMsg}'`, { encoding: 'utf-8' });
    let msgArr = result.split('\n');
    vscode.window.showInformationMessage(msgArr && msgArr[1] ? msgArr && msgArr[1] : 'push 成功');
  } catch (e) {
    vscode.window.showWarningMessage('无文件更改or提交失败！');
  }
}

module.exports = function (context) {
  // 注册如何实现跳转到定义，第一个参数表示仅对json文件生效
  const disposable = vscode.commands.registerCommand('ty-helper.GitPush', function (dispose) {
    gitPush.apply(this, [dispose, context]);
  });

  context.subscriptions.push(disposable);
};