const vscode = require('vscode');
var child = require('child_process');
const utils = require('../../../util/index');
const { COMMITIZEN } = require('../../../constants');

/**
 * @deprecated
 * 通过 child_process 执行Git命令， 存在命令执行一直停滞的情况
 */
function runByChildProcess(gitMsg = '') {
  const cmd = utils.buildSHCommand(
    [`cd ${utils.getProjectPath()}`, 'git pull', 'git add .', `git commit -m '${gitMsg}'`, 'git push'],
    '\n'
  );

  try {
    const result = child.execSync(cmd, { encoding: 'utf-8' });

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
}

function runByTask(gitMsg = '') {
  const cmd = utils.buildSHCommand(['git pull', 'git add .', `git commit -m '${gitMsg}'`, 'git push']);

  vscode.tasks.executeTask(
    new vscode.Task({ type: 'shell' }, vscode.TaskScope.Workspace, 'TyHelper', 'sh', new vscode.ShellExecution(cmd))
  );
}

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

  runByTask(gitMsg);
};
