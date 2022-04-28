function nthSpace(n) {
  return new Array(n).fill(' ').join('');
}

function formatJSONText(jsonText = '', tab = 2) {
  let stack = [];
  let newJsonText = '';
  for (let i = 0; i < jsonText.length; i++) {
    let char = jsonText[i];
    switch (char) {
      case '{':
        stack.push('{');
        newJsonText += `{\n${nthSpace(stack.length * tab)}`;
        break;
      case '}':
        stack.pop();
        newJsonText += `\n${nthSpace(stack.length * tab)}}`;
        break;
      case '[':
        stack.push('[');
        newJsonText += `[\n${nthSpace(stack.length * tab)}`;
        break;
      case ']':
        stack.pop();
        newJsonText += `\n${nthSpace(stack.length * tab)}]`;
        break;
      case ',':
        newJsonText += `,\n${nthSpace(stack.length * tab)}`;
        break;
      default:
        newJsonText += char;
        break;
    }
  }
  return newJsonText;
}

module.exports = {
  nthSpace,
  formatJSONText
};
