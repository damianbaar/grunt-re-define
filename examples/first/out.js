;(function (parent, factory){
  if (typeof define === 'function' && define.amd) {
    define('ns/my-component', ['jquery','external2','d3'], factory)
  } else if (typeof module === "object" && !!module.exports) {
    module.exports = factory(require('jquery'),require('external2'),require('d3'))
  } else {
    var jquery =  parent.parent.core.jquery
    var external2 =  parent.external2
    var d3 =  parent.d3
  
    parent.ns = parent.ns || {};
parent.ns.my_component = factory(jquery,external2,d3);

  }
  }(this, function (jquery,external2,d3) {

  var closure = {}

  closure['jquery'] = jquery
  closure['external2'] = external2
  closure['d3'] = d3
  

var require = //externals: jquery,external2,d3 
(function (modules, namespace, imports) {
  function require(name){
    if(!namespace[name]) {
      var m = {exports:{}}
        , f = modules[name]

      if(f) {
        f = f[0].call(m, m.exports, require, m, f[1].__filename, f[1].__dirname);
        namespace[name] = f || m.exports;
      } else {
        if(!imports) throw new Error('Module does not exists ' + name);

        var mod;
        for(var i=0; i < imports.length; i++) {
          mod = imports[i] && imports[i][name];
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
'demo/dotpath/inner': [function(exports, require, module, __filename, __dirname) { 
    return 'inner';
}, {"__filename":"inner.js","__dirname":"dotpath"}], 
'demo/dotpath/fi-ve': [function(exports, require, module, __filename, __dirname) { 
    var inner = require('demo/dotpath/inner');
    return inner;
}, {"__filename":"fi-ve.js","__dirname":"dotpath"}], 
'demo/three': [function(exports, require, module, __filename, __dirname) { 
    return { hello: 'Yo!' };
}, {"__filename":"three.js","__dirname":"."}], 
'demo/two': [function(exports, require, module, __filename, __dirname) { 
    var $ = require('jquery');
    module.exports = 'two';
}, {"__filename":"two.js","__dirname":"."}], 
'demo/deps/template.html': [function(exports, require, module, __filename, __dirname) { 
module.exports = '<li></li><li></li><li></li><li></li>'
}, {"__filename":"template.html","__dirname":"deps"}], 
'demo/one': [function(exports, require, module, __filename, __dirname) { 
    var five = require('demo/dotpath/fi-ve');
    var three = require('demo/three');
    var two = require('demo/two');
    var template = require('demo/deps/template.html');
    return function () {
      console.log(template);
    };
}, {"__filename":"one.js","__dirname":"."}], 
'demo/deps/four': [function(exports, require, module, __filename, __dirname) { 
    var inner = require('demo/dotpath/inner');
    module.exports = 'Yeah that\'s me, I like better CommonJS style' + inner;
}, {"__filename":"four.js","__dirname":"deps"}], 
'external1': [function(exports, require, module, __filename, __dirname) { 
    var jquery = require('jquery');
    return 'i\'m external';
}, {"__filename":"external1.js","__dirname":"external"}], 
'demo/template.html': [function(exports, require, module, __filename, __dirname) { 
module.exports = '<div>test</div><div></div><div></div><div></div>'
}, {"__filename":"template.html","__dirname":"."}], 
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
}, {"__filename":"main.js","__dirname":"."}]
}
,  function() { this.my = this.my || {};this.my.component = this.my.component || {}; return this.my.component }.call(this) 
, [closure,window]
)

return require('demo/main') 

}.bind({})))
