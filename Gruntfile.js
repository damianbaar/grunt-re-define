var includeExternal = require('re-define-include-external')
  , wrap = require('re-define-wrap')
  , fs = require('fs')

module.exports = function(grunt) {

  grunt.registerTask('default', ['demo'])
  grunt.registerTask('dev', ['watch'])
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
        , returns : './main.js'
        , wrapper: 'custom'
        , base: '/lib'
        , names: { amd:"ns/my-component", global:"ns.my_component"}
        , excludeAMDModules: ['\.css$', 'domReady!']
        , globals: {jquery:"core.jquery"}
        , namespace: "my.component"
        , imports: ["window"] //import namespaces
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
      }
    },

    watch: {
      scripts: {
        files: ['./examples/first/**/*.js', '!./examples/first/out.js'],
        tasks: ['redefine'],
        options: {
          spawn: false
        }
      }
    }
  })

  grunt.loadTasks('tasks')
  grunt.loadNpmTasks('grunt-contrib-watch')
}
