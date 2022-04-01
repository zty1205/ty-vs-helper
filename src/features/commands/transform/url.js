const vscode = require('vscode');
const path = require('path');
const { getConfiguration } = require('../../../util');
const { baseTransform, baseBuild, urlParse, isLink } = require('./util');

exports.transformEncodeURIComponent = () => baseTransform(encodeURIComponent);
exports.transformDecodeURIComponent = () => baseTransform(decodeURIComponent);

exports.transformUrlToObject = (content) => {
  baseBuild(async function (text) {
    if (!isLink(text)) {
      vscode.window.showWarningMessage('请选择正确的URL！');
      return;
    }
    const result = urlParse(text, {}, getConfiguration('ty-helper.UrlParse.deep'));
    let file = vscode.Uri.file(path.resolve(content.fsPath, `../urlParse_${Date.now()}.json`));

    await vscode.workspace.fs.writeFile(file, new Uint8Array(Buffer.from(JSON.stringify(result))));

    await vscode.window.showTextDocument(file);
  });
};
