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
        , base: '/lib'
        , names: { amd:"ns/my-component", global:"ns.my_component"}
        , excludeAMDModules: ['\.css$', 'domReady!']
        , globals: {jquery:"parent.core.jquery"}
        , namespace: "my.component"
        , imports: ["window"] //import namespaces
        , transforms: [
            includeExternal({
                skip: ['d3', 'jquery']
              , external: { external1:"/external/external1.js" }
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
