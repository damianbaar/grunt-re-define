var includeExternal = require('re-define-include-external')
  , redefine = require('re-define')
  , fs = require('fs')

module.exports = function(grunt) {

  grunt.registerTask('default', ['demo'])
  grunt.registerTask('template', ['redefine:custom-template'])
  grunt.registerTask('demo', ['redefine:my-component', 'jsbeautifier'])

  grunt.initConfig({
    redefine: {
      options: {
        wrappers: {
          clean: redefine.template(fs.readFileSync('./examples/first/template.tmpl'))
        }
      },
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
      },
      "custom-template": {
        main: 'examples/first/lib/main.js'
      , dest : 'out.js'
      , wrapper: 'clean'
      }
    },
    "jsbeautifier" : {
      files : ["out.js"]
    }
  })

  grunt.loadTasks('tasks')
  grunt.loadNpmTasks('grunt-jsbeautifier')
}
