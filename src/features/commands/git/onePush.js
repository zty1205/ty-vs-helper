const vscode = require('vscode');
var child = require('child_process');
const utils = require('../../../util/index');
const { COMMITIZEN } = require('../../../constants');
const { appendFileByPath, getPackageJson } = require('../../../util/file');
const dayjs = require('dayjs');
const { transPascal } = require('../../../util/word');

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
  const sh = ['git pull', 'git add .', `git commit -m '${gitMsg}'`];

  const pushImmediately = utils.getConfiguration('ty-helper.OnePush.pushImmediately');
  if (pushImmediately) {
    sh.push('git push');
  }

  const cmd = utils.buildSHCommand(sh);

  vscode.tasks.executeTask(
    new vscode.Task({ type: 'shell' }, vscode.TaskScope.Workspace, 'TyHelper', 'sh', new vscode.ShellExecution(cmd))
  );
}

async function runChangeMd(commit = '', gitMsg = '') {
  const needChange = utils.getConfiguration('ty-helper.OnePush.changeLog');
  if (!needChange) return;

  let package = await getPackageJson();

  const content = `\n# ${package.version} (${dayjs(new Date()).format('YYYY-MM-DD')})\n\n## ${transPascal(
    commit
  )} \n\n${gitMsg
    .split(/[;；]/)
    .map((x) => `- ${x}\n`)
    .join('')}\n`;

  return appendFileByPath('./CHANGELOG.md', content, '不存在CHANGELOG.md文件');
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

  await runChangeMd(commit, gitMsg);

  runByTask(gitMsg);
};
