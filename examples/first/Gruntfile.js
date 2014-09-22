var includeExternal = require('re-define-include-external')
  , redefine = require('re-define')
  , fs = require('fs')

module.exports = function(grunt) {
  grunt.registerTask('default', ['demo'])
  grunt.registerTask('demo', ['redefine:my-component'])

  grunt.initConfig({
    redefine: {
      "my-component": {
          project: 'my-component'
        , returns : 'main.js'
        , wrapper: 'umd'
        , names: { amd:"ns/my-component", global:"ns.my_component"}
        , excludeAMDModules: ['\.css$', 'domReady!']
        , globals: {"jquery":"jquery"}
        , namespace: "my.component"
        , map: {"d3/d3":"d3"}
        , imports: ["window"] //you can also specify different namespaces
        , transforms: [
            includeExternal({
              external     : { external1:"../external/external1.js" }
            // , skip : ['d3']
          // , discoverable: []
              // discoverable : ['examples/first/external/']
            })
        ]
        , src: ['./lib/main.js']
        , dest : './examples/out.js'
      },
    }
  })
  
  grunt.loadTasks('../../tasks')
}
