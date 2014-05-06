"use strict";

// require
var spawn = require('child_process').spawn;
var fs = require("fs");
var url = require("url");

var codePartials = {
  preJSON: 'var fs=require("fs");var url=require("url");var base64_decode=require("base64").decode;var exports={};var imports={};var thread={exports:exports,imports:imports,exit:function(){process.stdout.write(JSON.stringify(thread.exports));process.exit()},on:function(e,t){process.stdin.on(e,t)},once:function(){process.stdin.once.apply(process.stdin,arguments)},write:function(){process.stdout.write.apply(process.stdout,arguments)},end:function(){process.stdout.end.apply(process.stdout,arguments)},error:function(){process.stderr.write.apply(process.stderr,arguments)},resume:function(){process.stdin.resume.apply(process.stdin,arguments)}};process.on("exit",thread.exit);imports=thread.imports=',
  postJSON: ';'
}

var Thread = module.exports = function Thread(path, data, cb){ // TODO: make Thread.stream main fn and this a delegate
  
  //: create tmp-script
  
  var absPath = url.resolve(process.cwd()+"/", path);
  var pt = process.hrtime();
  pt = pt[0] * 1000 + pt[1] / 1000;
  var buildPath = absPath+'-thread-'+ (pt) +'.js';
  var absDir = url.resolve(absPath, "./");
  var cp;
  
    
  fs.readFile(absPath, function (err, script) {
    if (err) throw err;
    
    
    fs.writeFile(buildPath, codePartials.preJSON +
      JSON.stringify(data) +
      codePartials.postJSON +
      script.toString()
    , function (err) {
      if (err) throw err;
      
      /**************/
      
      cp = spawn("node", [buildPath], {cwd:absDir});

      if(cb) {
        var body = "";
        cp.stdout.on("data", function(chunk){
          //var chunk = process.stdin.read();
          body += chunk.toString("utf-8");
        });
        cp.stderr.on("data", function(err){
          cb(err.toString("utf-8"));
        });
        cp.on("close", function(){
        //console.log("CLOSE!!!");
    
          try {
            body = JSON.parse(body);
          } catch(e) {
            // body = body;
          }
          //console.log(body);
          setTimeout(function(){
            fs.unlink(buildPath, function (err) {
              if (err) console.error(err);
              //console.log('successfully deleted /tmp/hello');
            });
          }, 1000) // TODO: Remove timeOut!

          cb(null, body);
        });
      }
      
      /**************/
    });
    
  });
  
  this.on = function(name, fn){
    switch (name) {
      case "error":
        cp.stderr.on("data", fn);
        break;
      case "data":
      case "readable":
        cp.stdout.on("data", fn);
        break;
      case "close":
      case "end":
        cp.on("close", fn); // TODO: maybe here is something missing!
    }
    cp.stdout.on.apply(cp.stdout, arguments);
  };
  this.emit = function(){
    cp.stdout.emit.apply(cp.stdout, arguments);
  };
  
  this.end = function(){
    cp.stdin.end.apply(cp.stdin, arguments);
  };
  this.write = function(){
    cp.stdin.write.apply(cp.stdin, arguments);
  };
  
};


Thread.json = function(){};
Thread.stream = function(){};
Thread.json = function(){};
Thread.json = function(){};

Thread.settings = {
  noMultitasking: false,
  maxThreads: 8 // TODO: 
};

