var includeExternal = require('re-define-include-external')
  , fs = require('fs')

module.exports = function(grunt) {

  grunt.registerTask('default', ['demo'])
  grunt.registerTask('demo', ['redefine:my-component'])

  grunt.initConfig({
    redefine: {
      options: { 
        wrappers: { 
          custom: fs.readFileSync('./examples/first/custom.tmpl')
        }
      },
      "my-component": {
          project: 'demo'
        , returns : 'demo/main.js'
        , wrapper: 'custom'
        , base: '/lib'
        , names: { amd:"ns/my-component", global:"ns.my_component"}
        , excludeAMDModules: ['\.css$', 'domReady!']
        , globals: {jquery:"parent.core.jquery"}
        , namespace: "my.component"
        , imports: ["window"] //import namespaces
        , showWarnings: false
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
