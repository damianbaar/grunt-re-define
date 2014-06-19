module.exports = function(grunt) {

  grunt.registerTask('demo', ['redefine:my-component', 'jsbeautifier'])

  grunt.initConfig({
    redefine: {
      options: {
        wrapper: 'umd/4all'
      },
      "my-component": {
          map       : 'jquery#parent.$,external2#parent.myExtLib'
        , return    : 'deps/four'
        , files: [
          { cwd  : 'examples/first/lib'
          , dest : 'out.js'
          , src  : [ '../external/external1.js#external1' //path#alias, relative to cwd
                   , '**/*.+(js|html)' ]
          }
        ]
      }
    },
    "jsbeautifier" : {
      files : ["out.js"]
    }
  })

  grunt.loadTasks('tasks')
  grunt.loadNpmTasks('grunt-jsbeautifier')
}
