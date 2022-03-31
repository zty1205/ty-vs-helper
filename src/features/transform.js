const vscode = require('vscode');
const { splitWords } = require('../util');

function baseTransform(transformFunction) {
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
}

function transSnakeUpper(text) {
  return splitWords(text)
    .map((x) => x.toUpperCase())
    .join('_');
}

function transSnake(text) {
  return splitWords(text).join('_');
}

function transPascal(text) {
  return splitWords(text)
    .map((word) => word[0].toUpperCase() + word.slice(1).toLowerCase())
    .join('');
}

function transCamelCase(text) {
  const pascal = transPascal(text);
  return pascal[0].toLowerCase() + pascal.slice(1);
}

const transformEncodeURIComponent = () => baseTransform(encodeURIComponent);
const transformDecodeURIComponent = () => baseTransform(decodeURIComponent);
const transformSnakeUpper = () => baseTransform(transSnakeUpper);
const transformSnake = () => baseTransform(transSnake);
const transformPascal = () => baseTransform(transPascal);
const transformCamelCase = () => baseTransform(transCamelCase);

function register(context, name, transformFunction) {
  const disposable = vscode.commands.registerCommand(`ty-helper.${name}`, function (dispose) {
    transformFunction.apply(this, [dispose, context]);
  });

  context.subscriptions.push(disposable);
}

module.exports = function (context) {
  register(context, 'EncodeURIComponent', transformEncodeURIComponent);
  register(context, 'DecodeURIComponent', transformDecodeURIComponent);
  register(context, 'SnakeUpper', transformSnakeUpper);
  register(context, 'Snake', transformSnake);
  register(context, 'Pascal', transformPascal);
  register(context, 'CamelCase', transformCamelCase);
};
