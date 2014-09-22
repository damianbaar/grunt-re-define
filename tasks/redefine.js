var redefine    = require('re-define')
  , _           = require('lodash')
  , through     = require('through2')
  , path        = require('path')
  , Module      = require('re-define-module')

module.exports = function(grunt) {

  grunt.registerMultiTask('redefine', 'anything to anything converter', function() {
    var done = this.async()
      , config = _.merge(_.omit(this.data, 'files'), this.options())
      , base = config.base


    this.files.forEach(function(f) {
      var conf = redefine.config(_.omit(config, 'transforms'))
      conf.cwd = f.cwd

      var bundle = redefine.bundle(conf, config.transforms)

      bundle.pipe(through.obj(function(file, enc, next) {
        grunt.log.writeln('File "' + f.dest + '" created.')
        grunt.file.write(f.dest, file.contents)
      }, function() {
        done()
      }))

      if(!f.src) {
        grunt.log.error('SRC needs to be defined')
        return
        done()
      }
      f.src.forEach(function(fp) {
        var filepath = path.resolve(f.cwd, fp)

        if (!grunt.file.exists(filepath)) 
          grunt.log.warn('Source file "' + fp + '" not found.');
        else
          bundle.write(Module({ cwd: path.resolve(process.cwd(), f.cwd)
                              , base: path.dirname(filepath)
                              , path: path.resolve(filepath)
                              }))
      })
    })
  })
}
