const vscode = require('vscode');

exports.baseTransform = function (transformFunction) {
  const editor = vscode.window.activeTextEditor;
  if (!editor) {
    vscode.window.showInformationMessage('No ActiveTextEditor!');
    return;
  }

  if (!editor.selections || editor.selections.length === 0) {
    vscode.window.showInformationMessage('No Selected Text!');
    return;
  }

  editor.edit(function (edit) {
    editor.selections.forEach((selection) => {
      if (!selection.isEmpty) {
        const range = new vscode.Range(selection.start, selection.end);
        edit.replace(range, transformFunction(editor.document.getText(range)));
      }
    });
  });
};

exports.baseBuild = function (transformFunction) {
  const editor = vscode.window.activeTextEditor;
  if (!editor) {
    vscode.window.showInformationMessage('No ActiveTextEditor!');
    return;
  }

  if (!editor.selections || editor.selections.length === 0) {
    vscode.window.showInformationMessage('No Selected Text!');
    return;
  }

  editor.selections.forEach((selection) => {
    if (!selection.isEmpty) {
      const range = new vscode.Range(selection.start, selection.end);
      transformFunction(editor.document.getText(range));
    }
  });
};

exports.splitWords = function (text) {
  return text.match(/([^\s\-_A-Z]+)|([A-Z]+[^\s\-_A-Z]*)/g) || [];
};

function isLink(url = '') {
  return /(file)|(https?):\/\//.test(url);
}

exports.isLink = isLink;

function getProtocol(url = '') {
  let ms = url.match(/(.+):\/\//);
  return ms ? ms[1] : '';
}

exports.getProtocol = getProtocol;

function urlParse(url = '', params = {}, deep = false) {
  let arr = url.split('?');
  let baseUrl = arr[0];
  params._baseUrl = baseUrl;
  params._protocol = getProtocol(baseUrl);
  params._path = url;

  for (let i = 1; i < arr.length; i++) {
    let vars = arr[i].replace(/\/?#\/.*/, '').split('&');
    for (var j = 0; j < vars.length; j++) {
      let [key, val] = vars[j].split('=');

      let newVal = decodeURIComponent(val);
      if (deep && isLink(newVal)) {
        // @ts-ignore
        newVal = urlParse(newVal, {}, deep);
      }

      if (key in params) {
        params[key] = Array.isArray(params[key]) ? params[key].push(newVal) : [params[key], newVal];
      } else {
        params[key] = newVal;
      }
    }
  }

  return params;
}

exports.urlParse = urlParse;
