var redefine = require('re-define')

module.exports = function(grunt) {
  grunt.initConfig({
    redefine: {
      options: { }
    , first: {
        config: {
            "base": "examples/first/lib/"
          , "main": "main.js"
          , "output": "dist.js"
          , "wrapper": "test"
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
