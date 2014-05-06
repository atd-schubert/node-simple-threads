

var f = function fibonnaci(z){
  if(z<=2) return 1;
  return f(z-1)+f(z-2);
};

var start = imports.start || 5;
thread.exports.result = f(start);