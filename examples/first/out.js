;(function (parent, factory){
    var jquery =  parent.core.jquery
    var external2 =  parent.external2
  
    parent["ns"] = parent["ns"] || {};
    parent["ns"]["my_component"] = factory(jquery,external2);

  }(this, function (jquery,external2) {

  var closure = {}

  closure['jquery'] = jquery
  closure['external2'] = external2
  

var __req = 

//externals: jquery,external2 
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
'my-component/dotpath/inner': [function(exports, require, module, __filename, __dirname) { 
    return 'inner';
}, {"__filename":"","__dirname":""}], 
'my-component/dotpath/fi-ve': [function(exports, require, module, __filename, __dirname) { 
    var inner = require('my-component/dotpath/inner');
    var t;
    return inner;
}, {"__filename":"","__dirname":""}], 
'my-component/three': [function(exports, require, module, __filename, __dirname) { 
    return { hello: 'Yo!' };
}, {"__filename":"","__dirname":""}], 
'my-component/two': [function(exports, require, module, __filename, __dirname) { 
    var $ = require('jquery');
    module.exports = 'two';
}, {"__filename":"","__dirname":""}], 
'my-component/deps/template.html': [function(exports, require, module, __filename, __dirname) { 
module.exports = "<li></li><li></li><li></li><li></li>"
}, {"__filename":"","__dirname":""}], 
'my-component/one': [function(exports, require, module, __filename, __dirname) { 
    (function (process) {
      var five = require('my-component/dotpath/fi-ve');
      var three = require('my-component/three');
      var two = require('my-component/two');
      var template = require('my-component/deps/template.html');
      return function () {
        console.log(template);
      };
    }({}));
}, {"__filename":"","__dirname":""}], 
'my-component/deps/four': [function(exports, require, module, __filename, __dirname) { 
    var inner = require('my-component/dotpath/inner');
    module.exports = 'Yeah that\'s me, I like better CommonJS style' + inner;
}, {"__filename":"","__dirname":""}], 
'external1': [function(exports, require, module, __filename, __dirname) { 
    var jquery = require('jquery');
    return 'i\'m external';
}, {"__filename":"","__dirname":""}], 
'my-component/template.html': [function(exports, require, module, __filename, __dirname) { 
module.exports = "<div>test</div><div></div><div></div><div></div>"
}, {"__filename":"","__dirname":""}], 
'my-component/main': [function(exports, require, module, __filename, __dirname) { 
    var one = require('my-component/one');
    var jquery = require('jquery');
    var four = require('my-component/deps/four');
    var ext1 = require('external1');
    var ext2 = require('external2');
    var t1 = require('my-component/template.html');
    require('d3');
    require(['a'], function () {
      var a = [];
    });
    var a = 'test';
    return [
      one,
      four,
      t1
    ];
}, {"__filename":"","__dirname":""}]
}
,  function() { this.my = this.my || {};this.my.component = this.my.component || {}; return this.my.component }.call(this) 
, [closure,window]
)

return __req('my-component/main')

}.bind({})))
