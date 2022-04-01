const { registerCommand } = require('../../../util');
const deleteLocalBranch = require('./deleteLocalBranch');
const onePush = require('./onePush');

module.exports = function (context) {
  registerCommand(context, 'DeleteLocalBranch', deleteLocalBranch);
  registerCommand(context, 'OnePush', onePush);
};
