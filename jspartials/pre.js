//"use strict"; // isn't able, or all in strict!

// require
var fs = require("fs");
var url = require("url");

var base64_decode = require('base64').decode;


//process.stdin.resume(); //so the program will not close instantly

//setTimeout(function(){thread.exports}, 10000);
var exports = {};
var imports = {};


var thread = {
  exports: exports,
  imports: imports, //{}
  exit: function(){
    process.stdout.write(JSON.stringify(thread.exports));
    process.exit();
  },
  on: function(a,b){process.stdin.on(a,b)},//.apply(process.stdin, arguments);}, // without error?!
  once: function(){process.stdin.once.apply(process.stdin, arguments);},
  write: function(){process.stdout.write.apply(process.stdout, arguments);},
  end: function(){process.stdout.end.apply(process.stdout, arguments);},
  error: function(){process.stderr.write.apply(process.stderr, arguments);},
  
  resume: function(){process.stdin.resume.apply(process.stdin, arguments)}
};


process.on('exit', thread.exit);
imports = thread.imports= {}; // Here goes JSON, after that goes code...

// eval(pre-code+fs.readSync()+postcode);

//catches ctrl+c event
//process.on('SIGINT', exitHandler.bind(null, {exit:true}));

//catches uncaught exceptions
//process.on('uncaughtException', exitHandler.bind(null, {exit:true}));