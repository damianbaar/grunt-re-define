var includeExternal = require('re-define-include-external')
  , wrap = require('re-define-wrap')
  , fs = require('fs')

module.exports = function(grunt) {

  grunt.registerTask('default', ['demo'])
  grunt.registerTask('dev', ['redefine:my-component:development', 'watch'])
  grunt.registerTask('demo', ['redefine:my-component'])
  grunt.registerTask('prod', ['redefine:my-component:production'])

  grunt.initConfig({
    redefine: {
      options: { 
        wrappers: { 
          custom: fs.readFileSync('./examples/first/custom.tmpl')
        }
      },

      "my-component": {
          returns : './main.js'
        , base: '/lib'
        , names: { amd:"ns/my-component", global:"ns.my_component"}
        , excludeAMDModules: ['\.css$', 'domReady!']
        , globals: {jquery:"_"}
        , namespace: "my.component"
        , imports: { "window": ['d3','external2'] }//import namespaces and exclude internal ns modules (could be a glob pattern)
        , builds: {
          development: {
            development: true//enable/disable cache for faster builds
          , showWarnings: true
          , wrapper: 'custom'
          , dest: './examples/first/out.development.js'
          , transforms: [ includeExternal({skip:['jquery','d3']}) ]
          },
          production: {
            development: false
          , showWarnings: false
          , wrapper: 'umd'
          , dest: './examples/first/out.production.js'
          }
        }
        , transforms: [
            includeExternal({
                discoverable: ['external']
              , external: { external1:"/external/external1.js" }
            }),
            wrap({
              './examples/first/lib/one.js': '(function (process) {})({})'
            })
        ]
        , src: ['./lib/main.js']
        , cwd: './examples/first'
        , dest : './examples/first/out.js'
      },

      "my-app": {
          base: '/src'
        , names: { amd:"my-app", global:"ns.my-app"}
        , globals: { jquery:"$" }
        , transforms: [
            includeExternal({ discoverable: ['vendor', 'src'] })
        ]
        , src: ['./src/index.js']
        , cwd: './examples/my-app'
        , dest : './examples/my-app/out.js'
      }
    },

    watch: {
      scripts: {
        files: ['./examples/first/**/*.js', '!./examples/first/out.js'],
        tasks: ['redefine:my-component:development'],
        options: {
          spawn: false
        }
      }
    }
  })

  grunt.loadTasks('tasks')
  grunt.loadNpmTasks('grunt-contrib-watch')
}
