//re-define version:1.14.4
//library version:0.4.0
//externals: jquery
;(function (parent, factory){
    var jquery =  parent._
  
    parent["my"] = parent["my"] || {};
    parent["my"]["component"] = factory(jquery);

  }(this, function (jquery) {

  var closure = {}

  closure['jquery'] = jquery
  

var __req = (function (modules, namespace, imports) {
  var __oldReq = typeof require == "function" && require

  function __req(name){

    if(!namespace[name]) {
      var f = modules[name]
        , m = { exports:{} }
        , args

      if(f) {

        args = [m.exports, function(x) {
          return __req(x)
        }, m].concat(f.slice(1))

        namespace[name] = m;
        f = f[0].apply(null, args);
        f && (m.exports = f);
      } else {
        var mod
          , len = imports && imports.length;

        for(var i=0; i < len; i++) {
          mod = imports[i] && imports[i][name];
          if(mod) return mod;
        }

        if(__oldReq) return __oldReq.apply(null, arguments);
        throw new Error('Module does not exists ' + name);
      }
    }
    return namespace[name].exports;
  }

  return __req;
})
({ 
'my-component/dotpath/inner': [function(exports,require,module) { 
    return 'inner';
}], 
'my-component/dotpath/fi-ve': [function(exports,require,module) { 
    var inner = require('my-component/dotpath/inner');
    var t;
    return inner;
}], 
'my-component/three': [function(exports,require,module) { 
    return { hello: 'Yo!' };
}], 
'my-component/two': [function(exports,require,module) { 
    var $ = require('jquery');
    module.exports = 'two';
}], 
'my-component/deps/template.html': [function(exports,require,module) { 
module.exports = "<li></li><li></li><li></li><li></li>"
}], 
'my-component/one': [function(exports,require,module) { 
    (function (process) {
      var five = require('my-component/dotpath/fi-ve');
      var three = require('my-component/three');
      var two = require('my-component/two');
      var template = require('my-component/deps/template.html');
      return function () {
        console.log(template);
      };
    }({}));
}], 
'my-component/deps/four': [function(exports,require,module) { 
    var inner = require('my-component/dotpath/inner');
    module.exports = 'Yeah that\'s me, I like better CommonJS style' + inner;
}], 
'external1': [function(exports,require,module) { 
    var jquery = require('jquery');
    return 'i\'m external';
}], 
'my-component/template.html': [function(exports,require,module) { 
module.exports = "<div>test</div><div></div><div></div><div></div>"
}], 
'my-component/main': [function(exports,require,module) { 
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
}]
}
,  function() { this.my = this.my || {};this.my.component = this.my.component || {}; return this.my.component }.call(this) 
, typeof window === 'undefined' ? [] : [closure,window]
)

return __req('my-component/main')

}.bind({})))
