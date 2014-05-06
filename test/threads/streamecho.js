// Events werden nichrt ausgeführt!

thread.resume();
//process.stdin.resume();

/*thread.on("close", function(){
thread.error("test fehler");
  thread.end();
});
*/
thread.on("data", function(chunk){
  thread.write(chunk);
});

/*process.stdin.on("data", function(chunk){
  thread.write(chunk);
});*/

thread.exports = thread.imports;

setTimeout(function(){}, 10000);