module.exports = function(grunt) {

  grunt.initConfig({
    redefine: {
      first: {
        config: {
            "base": "examples/first/lib/"
          , "main": "main.js"
          , "output": "dist.js"
          , "wrapper": "umd/amd-web"
          , "name": "my-component"
          , "namespace": "ns"
          , "dependencies":
            { "resolve": 
              { "^(css\/?)*!": "css"
              , "^(domReady\/?)!": "skip" }
            , "references": 
              { "jquery": "$"
              , "exports": "this['ns']" }
            }
          }
        }
      }
  })

  grunt.loadTasks('tasks')
}
