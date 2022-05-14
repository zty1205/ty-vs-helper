const vscode = require('vscode');
const path = require('path');
const { getProjectPath, getConfiguration } = require('../../../util');
const { isExist, jumpFileByPath, readFile } = require('../../../util/file');
const { PATH_EXTS } = require('../../../constants');

async function getAbsPath(document, position) {
  const line = document.lineAt(position);

  if (line._text.indexOf('import') < 0) {
    return;
  }

  const alias = getConfiguration('ty-helper.JumpImport.alias') || { '@': './src' };
  const ali = Object.keys(alias);
  const words = line._text.split(/\s/);
  let importPath = words[words.length - 1].replace(/['";]/g, '');

  if (!new RegExp(`^(${ali.join('|')}|\/|\.\/)`).test(importPath)) return;

  let absPath;
  if (ali.some((a) => importPath.indexOf(a) > -1)) {
    for (let k in alias) {
      importPath = importPath.replace(new RegExp(`${k}\/`, 'g'), alias[k] + '/').replace(/\/\//, '/');
    }
    absPath = path.resolve(getProjectPath(), importPath);
  } else {
    absPath = path.resolve(path.dirname(document.fileName), importPath);
  }

  return absPath;
}

async function provideDefinition(document, position, token) {
  const absPath = await getAbsPath(document, position, token);

  if (/\.(.+)$/.test(absPath)) {
    return jumpFileByPath(absPath);
  } else {
    for (let ext of PATH_EXTS) {
      let uri = vscode.Uri.file(absPath + ext);
      const isEx = await isExist(uri);
      if (isEx) {
        return new vscode.Location(uri, new vscode.Position(1, 1));
      }
    }
  }
}

async function provideHover(document, position, token) {
  const absPath = await getAbsPath(document, position, token);

  if (/\.(.+)$/.test(absPath)) {
    let uri = vscode.Uri.file(absPath);
    const isEx = await isExist(uri);
    if (isEx) {
      const file = await readFile(uri);
      return new vscode.Hover({ value: file.toString(), language: absPath.split('.').pop() });
    }
  } else {
    for (let ext of PATH_EXTS) {
      let uri = vscode.Uri.file(absPath + ext);
      const isEx = await isExist(uri);
      if (isEx) {
        const file = await readFile(uri);
        return new vscode.Hover({ value: file.toString(), language: ext.split('.').pop() });
      }
    }
  }
}

exports.ImportSelector = ['vue', 'javascript', 'jsx', 'css'];
exports.ImportProvider = { provideDefinition };
exports.ImportHoverProvider = { provideHover };
