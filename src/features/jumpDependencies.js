const vscode = require('vscode');
const path = require('path');
const fs = require('fs');

function provideDefinition(document, position, token) {
  const fileName = document.fileName;
  const workDir = path.dirname(fileName);
  const word = document.getText(document.getWordRangeAtPosition(position));
  const line = document.lineAt(position);

  // 只处理package.json文件
  if (/\/package\.json$/.test(fileName)) {
    console.log(word, line.text);
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

module.exports = function (context) {
  // 注册如何实现跳转到定义，第一个参数表示仅对json文件生效
  context.subscriptions.push(
    vscode.languages.registerDefinitionProvider(['json'], {
      provideDefinition
    })
  );
};
