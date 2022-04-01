const vscode = require('vscode');
const path = require('path');
const fs = require('fs');

function provideDefinition(document, position, token) {
  const fileName = document.fileName;
  const workDir = path.dirname(fileName);
  const word = document.getText(document.getWordRangeAtPosition(position));
  const line = document.lineAt(position);

  if (/\/package\.json$/.test(fileName)) {
    const json = document.getText();
    if (
      new RegExp(
        `"(dependencies|devDependencies)":\\s*?\\{[\\s\\S]*?${word.replace(/\//g, '\\/')}[\\s\\S]*?\\}`,
        'gm'
      ).test(json)
    ) {
      let destPath = `${workDir}/node_modules/${word.replace(/"/g, '')}/package.json`;
      if (fs.existsSync(destPath)) {
        // 表示跳转到某个文件的第一行第一列
        return new vscode.Location(vscode.Uri.file(destPath), new vscode.Position(0, 0));
      }
    }
  }
}

exports.JDSelector = ['json'];
exports.JDProvider = { provideDefinition };
