

//thread.error(JSON.stringify(imports.start));
var path = imports.path || "../requirement.js";
thread.error(JSON.stringify(imports.path));
var start = imports.start || 5;
thread.exports.result = require(path);
/*if(thread) {
  thread.exports = f();
}
*/