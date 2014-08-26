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
          , names: { amd:"ns/my-component", global:"ns.my_component"}
          , excludeDepRef : ['\.css$', 'domReady!']
          // , globals: ["jquery#parent.core.jquery"] globals remapping
          , transforms: [
              includeExternal({
                external     : { external1:"examples/first/external/external1.js" }
                //discoverable : ['examples/first/external/']
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
          clean: redefine.template(fs.readFileSync('./examples/first/template.tmpl'))
        }
      },
      ...
    }
  })
}
```

### Debug
`DEBUG=re-define:* grunt`

