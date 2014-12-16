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
          project: 'demo' //optional, when not defined target (i.e. my-component) will be taken
        , returns : 'demo/main.js'
        , wrapper: 'umd'
        , base: '/lib'
        , names: { amd:"ns/my-component", global:"ns.my_component"}

        //import namespaces and exclude internal modules
        //when object { 'window': ['d3'], 'custom.ns': ['custom/**'] }
        //or an array ['window', etc...]
        //namespace - global, reachable by internal require function within module
        , imports: { "window": ['d3'] } 

        //if you've got some AMD plugins which need to be removed when trying to make lib cross compatibile
        , excludeAMDModules: ['\.css$', 'domReady!']

        //mapping, internal require('jquery') -> (to) global = parent.core.jquery
        //by default everything is attached to parent, in most cases window
        , globals: {jquery:"core.jquery"}

        //safe global for internal modules
        //var my = my || {}; my.component = ...
        , namespace: "my.component"

        , showWarnings: false
        , development: true//enable/disable cache for faster builds
        , transforms: [
            includeExternal({
                skip: ['d3', 'jquery']
              , external: { external1:"/external/external1.js" }
            }),
            wrap({
              './examples/first/lib/one.js': '(function () {})()'
            })
        ]
        , src: ['./lib/main.js']
        , cwd: './examples/first'
        , dest : './examples/first/out.js'
      },
    }
  })

  grunt.loadTasks('tasks')
}
```

#### Configuration
```js
  { names         : { amd: 'amd/name', global: 'global.name' }
  , project       : '' //project name, adding a prefix to internal module name
  , returns       : ''
  , globals      : {} //external {lib:global}

  //working directory
  , cwd           : '.'
  //define cutting points for modules { glob_pattern: file, ... }
  , slice         : {"**/**": "bundle.js"}
  //could be a folder (in case of many files) or just file, when not defined print output to console
  , output        : ''
  //base folder, all modules will be aligned to this one, like cwd: a, file: a/b/c, base: a/b, file -> c
  , base          : ''
  //wrapper file 
  , wrapper       : 'default'
  //attach all bundled modules to namespace, foo.baz.bar is allowed
  , namespace: '' 
  //skip dependencies from externals (won't be included in wrapper as external for all module definition, assume that dep will be taken from namespace)
  , exclude: []
  //exclude specific AMD dependencies
  , excludeAMDModules : ['\.css$', 'require', 'modules', 'exports']
  //regexp to detect an AMD plugins, first we need to remove the plugin prefix to get a path
  , plugins      : ['^(text\/?)*!']
  //when name for dependency will resolved it will treat modules inside those folders as external
  , discoverable : ['bower_components', 'node_modules']
  //import namespaces, if you need to take some deps from exported namespace
  , imports: []
  //remap require calls, helpful when some libs have different reference to the same module
  , map: {}
  //js extensions, needed for filename.with.dots.js
  , jsExt: ['.js']
  //check existence of main/dir file when referencing a dir, like require('folder') = folder/index.js
  , dirExpanders: ['index.js']
  //when project is missing, inserting current folder as a prefix for modules
  , autoInsertFolder: true
  //format for escodegen
  , format: {
      indent: { style: '  ', base: 2 },
      space: ' ',
      compact: false,
      safeConcatenation: false
    }
  //export __filename, __dirname
  , exportPaths: false 
  , showWarnings: false
  , tempFolder: './.tmp'
  , autoCacheClean: false
  , development: true
  }
```


### Custom template
Here you can find [predefined](https://github.com/damianbaar/re-define/lib/templates) ones.
```
module.exports = function(grunt) {

  grunt.initConfig({
    redefine: {
      options: { 
        wrappers: { 
          custom: fs.readFileSync('./examples/first/custom.tmpl')
        }
      }
      ...
    }
  })
}
```

### Debug
`DEBUG=re-define:* grunt`

