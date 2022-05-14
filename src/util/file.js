const vscode = require('vscode');
const { getProjectUri } = require('./index');

// 文件不存在的情况下会报错
async function writeFile(uri, data) {
  return vscode.workspace.fs.writeFile(uri, Buffer.from(data));
}

async function readFile(uri) {
  return vscode.workspace.fs.readFile(uri);
}

async function appendFile(uri, data, notFundMsg) {
  try {
    const oldCt = await readFile(uri);
    const b1 = Buffer.from(oldCt);
    const b2 = Buffer.from(data);
    const newCt = Buffer.concat([b1, b2], b1.length + b2.length);
    return writeFile(uri, newCt);
  } catch (e) {
    if (e.code === 'FileNotFound' || e.message.indexOf('ENOENT')) {
      vscode.window.showWarningMessage(notFundMsg);
    }
  }
}

async function appendFileByPath(path, data, notFundMsg) {
  const uri = vscode.Uri.joinPath(getProjectUri(), path);
  return appendFile(uri, data, notFundMsg);
}

async function getPackageJson() {
  try {
    const packageJson = await readFile(vscode.Uri.joinPath(getProjectUri(), './package.json'));
    return JSON.parse(packageJson.toString());
  } catch (e) {
    if (e.code === 'FileNotFound' || e.message.indexOf('ENOENT')) {
      vscode.window.showWarningMessage('package.json文件不存在');
    }
    throw new Error(e);
  }
}

async function isExist(uri) {
  return new Promise((resolve) => {
    vscode.workspace.fs.stat(uri).then(
      () => resolve(true),
      () => resolve(false)
    );
  });
}

async function jumpFileByPath(path) {
  return jumpFile(vscode.Uri.file(path));
}

async function jumpFile(uri) {
  const isEx = await isExist(uri);
  if (isEx) {
    return new vscode.Location(uri, new vscode.Position(0, 0));
  }
}

module.exports = {
  writeFile,
  readFile,
  appendFile,
  appendFileByPath,
  getPackageJson,
  isExist,
  jumpFileByPath,
  jumpFile
};
