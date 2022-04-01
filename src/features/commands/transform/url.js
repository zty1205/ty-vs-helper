const { baseTransform } = require('./util');

exports.transformEncodeURIComponent = () => baseTransform(encodeURIComponent);
exports.transformDecodeURIComponent = () => baseTransform(decodeURIComponent);
