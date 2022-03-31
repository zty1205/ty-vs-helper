const vscode = require('vscode');
const path = require('path');
var child = require('child_process');

async function deleteBranch(dispose, context) {
  const dir = path.resolve(dispose.path, '../');

  const branchStr = child.execSync(`cd ${dir}\ngit branch`, { encoding: 'utf-8' });

  const branches = branchStr
    .split('\n')
    .map((s) => s.replace(/\s/g, ''))
    .filter((x) => x && x[0] !== '*');

  if (!branches.length) {
    vscode.window.showInformationMessage(`没有待删除的本地分支！`);
    return;
  }

  branches.forEach((bh) => {
    child.execSync(`cd ${dir}\ngit branch -D ${bh}`, { encoding: 'utf-8' });
  });

  vscode.window.showInformationMessage(`共删除了 ${branches.length} 个本地分支: ${branches.join(', ')}`);
}

module.exports = function (context) {
  const disposable = vscode.commands.registerCommand('ty-helper.DeleteLocalBranch', function (dispose) {
    deleteBranch.apply(this, [dispose, context]);
  });

  context.subscriptions.push(disposable);
};
