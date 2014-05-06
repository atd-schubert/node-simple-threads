var Thread = require("./index");

//eval("var feval = function fibonnaci(z){  if(z<=2) return 1;  return f(z-1)+f(z-2);};");

var ffStore = {};
var ff = function fibonnaci(z){
  if(z<=2) return 1;
  
  if(ffStore[z]){
    return ffStore[z];
  } else {
    return ffStore[z] = ff(z-1)+ff(z-2);
  }
};

var f = function fibonnaci(z){  if(z<=2) return 1;  return f(z-1)+f(z-2);};
var runTest = function(begin, level, callback){
  var tmp = 0;
  var start = Date.now();
  var openThreads = level;
  var cb = function(err, result){
    if(err) console.log("ERROR!: "+err);
    openThreads--;
    //console.log(result)
    tmp+=result.result;
    if(openThreads!=0) return;
    
    if(true || res!=tmp) console.warn([begin, res, tmp]);
    
    console.log("With "+level+" thread in: "+(Date.now()-start)+"ms");
    
    callback(err, tmp);
  };  

  switch(level) {
    case 1:
      new Thread("./test/threads/fibonacci.js", {start:begin}, cb);
      break;
    case 2:
      new Thread("./test/threads/fibonacci.js", {start:begin-1}, cb);
      new Thread("./test/threads/fibonacci.js", {start:begin-2}, cb);
      break;
    case 4:
      new Thread("./test/threads/fibonacci.js", {start:begin-1-1}, cb);
      new Thread("./test/threads/fibonacci.js", {start:begin-2-1}, cb);
      new Thread("./test/threads/fibonacci.js", {start:begin-1-2}, cb);
      new Thread("./test/threads/fibonacci.js", {start:begin-2-2}, cb);
      break;
  }
};

var i = 50;

console.log("\nStarting without threads:\n");
var start = Date.now();
var res = f(i);
console.log("Without threads in: "+(Date.now()-start)+"ms");
console.log("Result: "+res);

/*console.log("Starting fast sync");
var start = Date.now();
var res = ff(i);
console.log("Without threads in: "+(Date.now()-start)+"ms");
console.log("Result: "+res);*/



//runTest(i, 1, function(){});//runTest(i, 2, function(){runTest(i, 4, function(){});});});
//runTest(i, 1, function(){runTest(i, 2, function(){runTest(i, 4, function(){});});});

console.log("\nStarting with threads:\n");

runTest(i, 4, function(){runTest(i, 2, function(){
  console.log("\nRunning 4 thread and 2 thread at once...!\n");
  runTest(i, 4, function(){});
  runTest(i, 2, function(){});
});});