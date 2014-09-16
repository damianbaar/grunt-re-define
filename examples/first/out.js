//externals: jquery,external2 
(function (modules, namespace, imports) {
  function require(name){
    if(!namespace[name]) {
      var m = {exports:{}}
        , f = modules[name]

      if(f) {
        f = f[0].call(m, m, require, m, f[1].__filename, f[1].__dirname);
        namespace[name] = f || m.exports;
      } else {
        if(!imports) throw new Error('Module does not exists ' + name);

        var mod;
        for(var i=0; i < imports.length; i++) {
          mod = imports[i][name];
          if(mod) return mod;
        }

        if(!mod) throw new Error('Module does not exists ' + name);
      }
    }
    return namespace[name];
  }

  for(var name in modules) require(name);
  return require;
})
({ 
'd3/a': [function(exports, require, module, __filename, __dirname) { 
    var a = 'test';
}, {"__filename":"./examples/first/external/d3/a.js","__dirname":"./examples/first/external/d3"}], 
'd3/lib/b': [function(exports, require, module, __filename, __dirname) { 
    var b = 'test';
}, {"__filename":"./examples/first/external/d3/lib/b.js","__dirname":"./examples/first/external/d3/lib"}], 
'd3': [function(exports, require, module, __filename, __dirname) { 
    (function () {
      require('d3/a');
      require('d3/lib/b');
    }());
}, {"__filename":"./examples/first/external/d3/d3.js","__dirname":"./examples/first/external/d3"}], 
'external1': [function(exports, require, module, __filename, __dirname) { 
    var jquery = require('jquery');
    return 'i\'m external';
}, {"__filename":"./examples/first/external/external1.js","__dirname":"./examples/first/external"}], 
'demo/inner': [function(exports, require, module, __filename, __dirname) { 
    return 'inner';
}, {"__filename":"./inner.js","__dirname":"."}], 
'demo/deps/four': [function(exports, require, module, __filename, __dirname) { 
    var inner = require('demo/inner');
    module.exports = 'Yeah that\'s me, I like better CommonJS style' + inner;
}, {"__filename":"./deps/four.js","__dirname":"./deps"}], 
'demo/deps/template.html': [function(exports, require, module, __filename, __dirname) { module.exports = '<li></li><li></li><li></li><li></li>'
}, {"__filename":"./deps/template.html","__dirname":"./deps"}], 
'demo/dotpath/fi-ve': [function(exports, require, module, __filename, __dirname) { 
    var inner = require('demo/inner');
    return inner;
}, {"__filename":"./dotpath/fi-ve.js","__dirname":"./dotpath"}], 
'demo/three': [function(exports, require, module, __filename, __dirname) { 
    return { hello: 'Yo!' };
}, {"__filename":"./three.js","__dirname":"."}], 
'demo/two': [function(exports, require, module, __filename, __dirname) { 
    var $ = require('jquery');
    module.exports = 'two';
}, {"__filename":"./two.js","__dirname":"."}], 
'demo/one': [function(exports, require, module, __filename, __dirname) { 
    var five = require('demo/dotpath/fi-ve');
    var three = require('demo/three');
    var two = require('demo/two');
    var template = require('demo/deps/template.html');
    return function () {
      console.log(template);
    };
}, {"__filename":"./one.js","__dirname":"."}], 
'demo/template.html': [function(exports, require, module, __filename, __dirname) { module.exports = '<div>test</div><div></div><div></div><div></div>'
}, {"__filename":"./template.html","__dirname":"."}], 
'demo/main': [function(exports, require, module, __filename, __dirname) { 
    var one = require('demo/one');
    var jquery = require('jquery');
    var four = require('demo/deps/four');
    var ext1 = require('external1');
    var ext2 = require('external2');
    var t1 = require('demo/template.html');
    require('d3');
    return [
      one,
      four,
      t1
    ];
}, {"__filename":"./main.js","__dirname":"."}]
}
, function() { this.my = this.my || {};this.my.component = this.my.component || {}; return this.my.component }.call(this)
, [window]
)
