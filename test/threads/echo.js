/*
thread.on("close", function(){
thread.error("test fehler");
  thread.end();
});

thread.on("data", function(chunk){
thread.error("test fehler2");
  thread.write(chunk);
})

process.stdin.on("data", function(chunk){
thread.error("test fehler3");
  thread.write(chunk);
})
process.stdin.on("data", function(chunk){
thread.error("test fehler4");
  thread.write(chunk);
})
*/
thread.exports = imports;

//setTimeout(function(){}, 1000)