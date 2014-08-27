# grunt-redefine
Grunt task for [re-define](https://github.com/damianbaar/re-define)

### Configuration
```js
  grunt.initConfig({
    redefine: {
      "my-component": {
            base: 'examples/first/lib'
          , main: 'examples/first/lib/main.js'
          , dest : 'out.js'
          , returns: 'main'
          , names: { amd:"ns/my-component", global:"ns.my_component"}
          , excludeDepRef : ['\.css$', 'domReady!']
          , globals: ["jquery#parent.core.jquery"]
          , transforms: [
              includeExternal({
                external     : { external1:"examples/first/external/external1.js" }
              , discoverable : ['node_modules','bower_components', 'examples/first/external/']
              , skip : []
              })
          ]
      }
    },
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
          my: redefine.template(fs.readFileSync('./examples/first/template.tmpl'))
        }
      },
      ...
    }
  })
}
```

### Debug
`DEBUG=re-define:* grunt`

