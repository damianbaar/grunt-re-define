# grunt-redefine
Grunt task for [re-define](https://github.com/damianbaar/re-define)

### Configuration
```js
  grunt.initConfig({
    redefine: {
      options: {
        wrapper: 'umd'
      },
      "my-component": {
          map    : { jquery: 'parent.$', external2: 'parent.myExtLib' }
        , external : { external1 : '../external/external1.js' }
        , return : 'deps/four'
        , files: [
          { cwd  : 'examples/first/lib'
          , dest : 'out.js'
          , src  : [ '**/*.+(js|html)' ]
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
          clean: redefine.template("{{{code}}}")
        }
      }
      ...
    }
  })
}
```

### Debug
`DEBUG=re-define:* grunt redefine`

