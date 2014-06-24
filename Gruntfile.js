module.exports = function(grunt) {

  grunt.registerTask('demo', ['redefine:my-component', 'jsbeautifier'])

  grunt.initConfig({
    redefine: {
      options: {
        wrapper: 'umd'
      },
      "my-component": {
          map    : {jquery: 'parent.$', external2: 'parent.myExtLib'}
        , external : {
          external1 : '../external/external1.js'
        }
        , return : 'deps/four'
        , files: [
          { cwd  : 'examples/first/lib'
          , dest : 'out.js'
          , src  : [ '**/*.+(js|html)' ]
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
