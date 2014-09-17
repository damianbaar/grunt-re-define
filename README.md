# grunt-redefine
Grunt task for [re-define](https://github.com/damianbaar/re-define)

### Usage
```js
var includeExternal = require('re-define-include-external')
  , redefine = require('re-define')
  , fs = require('fs')

module.exports = function(grunt) {

  grunt.registerTask('default', ['demo'])
  grunt.registerTask('demo', ['redefine:my-component'])

  grunt.initConfig({
    redefine: {
      "my-component": {
          project: 'demo'
        , returns : 'main'
        , names: { amd:"ns/my-component", global:"ns.my_component"}
        , excludeAMDModules: ['\.css$', 'domReady!']
        , globals: {jquery: "parent.core.jquery"} //path to global
        , namespace: "my.component"
        , imports: ["window"]
        , transforms: [
            includeExternal({
              // external     : { external1:"examples/first/external/external1.js" }
              discoverable : ['examples/first/external/']
            })
        ]
        //glob patterns or files
        , src: ['**/*.+(js|html)', '!**/node_modules/**', '!index.html', '!out.js']
        , cwd: './examples/first/'
        , dest : './examples/first/out.js'
      },
    }
  })

  grunt.loadTasks('tasks')
}
```

#### Configuration
```
module.exports = 
  { names         : {amd: 'amd/name', global: 'global.name'}
  , project       : '' //project name, adding a prefix to internal module name
  , returns       : '' //by default returns last module
  , globals      : {} //external {lib:global}

  //define cutting points for modules { glob_pattern: file }
  , slice         : {"**/**": "bundle.js"}
  //could be a folder (in case of many files) or just file, when not defined print output to console
  , output        : ''
  //base folder, all modules will be aligned to that
  , base          : '.'
  //wrapper file 
  , wrapper       : 'default'
  //attach all bundled modules to namespace, foo.baz.bar is allowed, if empty init empty object
  , namespace: '' 
  //exclude specific AMD dependencies
  , excludeAMDModules : ['\.css$', 'require', 'modules', 'exports']
  //regexp to detect an AMD plugins, first we need to remove the plugin prefix to get a path
  , plugins      : ['^(text\/?)*!']
  //import namespaces, if you need to take some deps from globals like jquery, define it as ['window']
  , imports: []
  //remap require calls, helpful when some libs have different reference to the same module
  , map: {}
  //format for escodegen
  , format: {
      indent: { style: '  ', base: 2 },
      space: ' ',
      safeConcatenation: false
    }
  }
```


### Custom template
Here you can find [predefined](https://github.com/damianbaar/re-define/lib/templates) ones.
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

