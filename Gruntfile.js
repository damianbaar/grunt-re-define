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
        , returns : 'demo/main.js'
        , wrapper: 'umd'
        , names: { amd:"ns/my-component", global:"ns.my_component"}
        , excludeAMDModules: ['\.css$', 'domReady!']
        , globals: {jquery:"parent.core.jquery"}
        , namespace: "my.component"
        , imports: ["window"] //you can also specify different namespaces
        , transforms: [
            includeExternal({
              // external     : { external1:"examples/first/external/external1.js" }
              discoverable : ['examples/first/external/']
            })
        ]
        , src: ['./lib/main.js']
        , cwd: './examples/first/'
        , dest : './examples/first/out.js'
      },
    }
  })

  grunt.loadTasks('tasks')
}
