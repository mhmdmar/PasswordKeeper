// allow the use of ES6 features in node js
require = require("esm")(module /*, options*/);

module.exports = require("./server.js");