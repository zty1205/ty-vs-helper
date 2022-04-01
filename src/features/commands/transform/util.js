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

exports.splitWords = function (text) {
  return text.match(/([^\s\-_A-Z]+)|([A-Z]+[^\s\-_A-Z]*)/g) || [];
};
