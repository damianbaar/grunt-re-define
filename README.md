# grunt-redefine
Grunt task for [re-define](https://github.com/damianbaar/re-define)

### Configuration
```js
  grunt.initConfig({
    redefine: {
      options: {
        wrapper: 'umd/4all'
      },
      "my-component": {
          map       : 'jquery#parent.$,external2#parent.myExtLib'
        , return    : 'deps/four'
        , files: [
          { cwd  : 'examples/first/lib'
          , dest : 'out.js'
          , src  : [ 
                   '../external/external1.js#external1' //path#alias, relative to cwd
                    , '**/*.+(js|html)'
          ]
          }
        ]
      }
    }
  })
```

### Custom template
```
var redefine = require('re-define')

module.exports = function(grunt) {

  grunt.initConfig({
    redefine: {
      options: {
        wrappers: {
          clean: redefine.wrapper.fromString("{{{code}}}")
        }
      }
      ...
    }
  })
}
```

### Debug
`DEBUG=re-define:* grunt redefine`

