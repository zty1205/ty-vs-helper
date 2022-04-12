const vscode = require('vscode');
var child = require('child_process');
const utils = require('../../../util/index');
const { COMMITIZEN } = require('../../../constants');

module.exports = async function () {
  const needCommitizen = utils.getConfiguration('ty-helper.OnePush.commitizen');

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
    const cmd = utils.buildSHCommand([
      `cd ${rootPath}`,
      'git pull',
      'git add .',
      `git commit -m '${gitMsg}'`,
      'git push'
    ]);
    const result = child.execSync(cmd, {
      encoding: 'utf-8'
    });

    vscode.window.showInformationMessage(result.split('\n').filter(Boolean).pop() || 'push 成功');
  } catch (e) {
    let msg = '没有文件更改or提交失败！';
    if (e && e.message) {
      let arr = e.message.split('\n');
      if (arr.length > 4) {
        msg = arr.slice(4).join('\n');
      } else {
        msg = e.message;
      }
    }
    vscode.window.showWarningMessage(msg);
  }
};
