const vscode = require('vscode');
const path = require('path');
const { getProjectPath, getCfgNTNumber, getConfiguration } = require('../../../util');
const { isExist, readFile } = require('../../../util/file');
const { STORE_FIND_PATH, NAMESPACE_STORE_FIND_PATH, STORE_MAX_CACHE } = require('../../../constants');
const { VUEX_WORDS, MAP_STORE_SHORT_REG } = require('../../../constants/regExp');

//
/**
 * 如果有namespace 会先查找
 * src/store/namespace.js
 * src/store/module/namespace.js
 * src/store.js
 * src/store/index.js
 * src/store/state.js | src/store/mutations.js
 * 配置的路径
 * 减少频繁调用fs，添加下缓存
 */

function getFindPath(namespace = '', ext = '', store = '') {
  ext = /^\./.test(ext) ? ext.substring(1) : ext;

  let path = STORE_FIND_PATH.concat(`./src/store/${store}`).map((p) => `${p}.${ext}`);
  if (namespace) {
    path = NAMESPACE_STORE_FIND_PATH.map((x) => `${x}/${namespace}.${ext}`);
  }
  path.push(`./src/store/${store}.${ext}`);

  const userPath = getConfiguration('ty-helper.JumpVuex.findPath') || [];
  path = path.concat(userPath.filter((x) => typeof x === 'string'));
  return path;
}

/**
 * path: {content: '', count: 0}
 * 记录使用次数，使用5次后更新缓存，认为频繁的访问存在改动的可能性更大
 */
const fileStore = {};

async function getFile(pat = '') {
  let absPath = path.resolve(getProjectPath(), pat);
  const file = fileStore[absPath];
  if (file === false) return false;

  const maxCache = getCfgNTNumber('ty-helper.JumpVuex.maxCache', STORE_MAX_CACHE);

  if ((file && file.count >= maxCache) || !file) {
    const uri = vscode.Uri.file(absPath);
    const isEx = await isExist(uri);
    if (isEx) {
      const content = await readFile(uri);
      fileStore[absPath] = {
        content,
        count: 1,
        uri
      };
      return fileStore[absPath];
    } else {
      fileStore[absPath] = false;
      return false;
    }
  }
  file.count += 1;
  return file;
}

function getPosition(content = '', store = '', vr = '') {
  if (!content || !store || !vr) return;
  const regExp = new RegExp(`${store}\\s*[:=]+\\s*{(\\r|\\n|\\r\\n|↵|.)+${vr}`, 'm');
  const mth = content.match(regExp);
  if (!mth) return;
  const subContent = content.substring(0, mth.index + mth[0].indexOf(vr) + vr.length + 1);
  const lineCols = subContent.split('\n');
  let vrCol;
  let vrStart;
  for (let i = 0; i < lineCols.length; i++) {
    if (lineCols[i].indexOf(vr) > -1) {
      vrCol = i;
      vrStart = lineCols[i].indexOf(vr);
      break;
    }
  }
  return vrCol ? new vscode.Position(vrCol, vrStart) : undefined;
}

async function jump(store = '', vr = '', namespace = '') {
  const ext = getConfiguration('ty-helper.global.ts') ? '.ts' : '.js';
  const paths = getFindPath(namespace, ext, store);
  for (let p of paths) {
    const file = await getFile(p);
    if (file) {
      const pos = getPosition(file.content.toString(), store, vr);
      if (pos && file.uri) {
        return new vscode.Location(file.uri, pos);
      }
    }
  }
}

async function provideDefinition(document, position) {
  const fileName = document.fileName;
  if (!/[\.vue|\.js|\.ts]$/.test(fileName)) return;

  const line = document.lineAt(position);
  const word = document.getText(document.getWordRangeAtPosition(position));
  const text = line._text;

  for (let i = 0; i < VUEX_WORDS.length; i++) {
    if (!VUEX_WORDS[i].test(text)) continue;

    const tMatch = text.match(MAP_STORE_SHORT_REG);
    if (!tMatch) continue;

    const store = ['state', 'mutations', 'actions', 'getters'];
    return jump(store[i], word, tMatch[2]);
  }
}

exports.VuexSelector = ['vue', 'javascript'];
exports.VuexProvider = { provideDefinition };
