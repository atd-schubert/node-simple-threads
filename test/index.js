var Thread = require("../index");


//# echo

var testObj = {str: "testing threads-module", float:1.234, int:4711, arr:[1,2,3,4], obj:{a:'a'}};


// ---- simple call
var t = new Thread("./threads/halloworld.js", {}, function(err, result){
  if(err) console.error('Error in simple call test: '+err);
  else console.log("completed simple call test...");
});

// ---- absolute path
var t = new Thread(__dirname + "/threads/halloworld.js", {}, function(err, result){
  if(err || !result || !result.halloworld) console.error('Error in absolute path test: '+err);
  else console.log("completed absolute path test...");
});

// ---- relative path
var t = new Thread("./threads/halloworld.js", {}, function(err, result){
  if(err || !result || !result.halloworld) console.error('Error in relative path test: '+err);
  else console.log("completed relative path test...");
});

// ---- delay test
var t = new Thread("./threads/delay.js", {}, function(err, result){
  if(err || !result.delay) console.error('Error in delay test: '+err);
  else console.log("completed delay test...");
});

// ---- echo json test
var t = new Thread("./threads/echo.js", testObj, function(err, result){
  if(err || !result.arr || !result.arr.length==4) console.error('Error in echo json test: '+err);
  else console.log("completed echo json test...");
});
/*
// ---- echo stream test
var t = new Thread("./threads/streamecho.js", {msg:"echo-Stream"});
t.on("data", function(chunk){ console.log(chunk.toString());
  if(!chunk || chunk.toString()!= "asdfghjklöä") console.error('Error in echo stream test. ');
  else console.log("completed echo stream test...");
});
t.on("error", function(chunk){ console.log(chunk.toString());
  console.error("ERROR: "+chunk.toString());
});
t.write("asdfghjklöä");
t.end();


// ---- require absolute test
var t = new Thread("./threads/require.js", {msg:"requrie-abs-test", path:__dirname+"/requirement.js"}, function(err, result){
  
  //  console.log(err);
  //console.log("XXXXX");
  //console.log(result);
  
  if(err || !result || !result.result || ! !result.result.data) console.error('Error in require absolute test: '+err);
  else console.log("completed require absolute test...");
});
/*
// ---- require relative test
var t = new Thread("./threads/require.js", {msg:"requrie-rel-test", path:"../requirement.js"}, function(err, result){
  
  console.log(err);
  console.log(result);
  
  if(err || !result || !result.result || ! !result.result.data) console.error('Error in require relative test: '+err);
  else console.log("completed require relative test...");
});

/*
// ---- JSON echo
var t = new Thread("./threads/echo.js", testObj, function(err, result){
console.log("result");
console.log(result);
console.log("testObj");
console.log(testObj);

  if(err || result.str != testObj.str || result.float != testObj.float || result.int != testObj.int) console.error('Error in json result echo test! '+err);
  else console.log("completed json result echo test...");
});
/*
// ---- stream echo
var t = new Thread("./threads/echo.js", testObj, function(err, result){
  if(err || JSON.stringify(result.text) != JSON.stringify(testObj.text)) throw new Error('Error in JSON echo Test!');
  
  console.log("completed json echo test...");
});

t.on("data", function(){
  
});

t.write(testObj.str);

/*
var t = new Thread("./sample-thread.js", {test: "Mal etwas ganz anderes..."}, function(err, result){
  if(!result) console.log("empty result!!");
  if(err) return console.log("fehler!!!"+err);
  console.log(result);
});

t.end();
*/