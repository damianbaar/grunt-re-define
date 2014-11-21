;(function (parent, factory){
    var jquery =  parent.core.jquery
  
    parent["ns"] = parent["ns"] || {};
    parent["ns"]["my_component"] = factory(jquery);

  }(this, function (jquery) {

  var closure = {}

  closure['jquery'] = jquery
  

var __req = //externals: jquery 
(function (modules, namespace, imports) {
  function __req(name){
    if(!namespace[name]) {
      var m = {exports:{}}
        , f = modules[name]

      if(f) {
        f = f[0].call(m, m.exports, __req, m, f[1].__filename, f[1].__dirname);
        namespace[name] = f || m.exports;
      } else {
        var mod
          , len = imports && imports.length;

        for(var i=0; i < len; i++) {
          mod = imports[i] && imports[i][name];
          if(mod) return mod;
        }

        if(typeof require == "function" && require) return require.apply(null, arguments);
        else if(!mod) throw new Error('Module does not exists ' + name);
      }
    }
    return namespace[name];
  }

  for(var name in modules) __req(name);
  return __req;
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
module.exports = "<li></li><li></li><li></li><li></li>"
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
module.exports = "<div>test</div><div></div><div></div><div></div>"
}, {"__filename":"template.html","__dirname":"."}], 
'demo/main': [function(exports, require, module, __filename, __dirname) { 
    var one = require('demo/one');
    var jquery = require('jquery');
    var four = require('demo/deps/four');
    var ext1 = require('external1');
    var ext2 = require('external2');
    var t1 = require('demo/template.html');
    require('d3');
    require(['a'], function () {
      var a = [];
    });
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

return __req('demo/main.js')

}.bind({})))
