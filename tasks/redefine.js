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

    if(!config.project) config.project = this.target
    if(!_.isEmpty(config.imports) && !_.isArray(config.imports)) {
      config.exclude = 
        (config.exclude || []).concat(
          _(config.imports).values().flatten().value() || [])

      config.imports = _.keys(config.imports)
    }

    this.files.forEach(function(f) {
      var conf = redefine.config(_.omit(config, 'transforms'))

      conf.cwd = !!f.cwd ? f.cwd : '.'

      var bundle = redefine.bundle(conf, config.transforms)

      bundle.pipe(through.obj(function(file, enc, next) {
        grunt.log.writeln('File "' + f.dest + '" created.')
        grunt.file.write(f.dest, file.contents)
        next()
      }, function() {
        done()
      }))

      if(_.isEmpty(f.src)) {
        grunt.log.error('Source is empty, most likely file/s does not exist, align to cwd:', conf.cwd, f.orig.src)
        done()
        return
      }

      f.src.forEach(function(fp) {
        var filepath = path.resolve(f.cwd || conf.cwd, fp)

        bundle.write(Module({ cwd: path.resolve(process.cwd(), f.cwd || conf.cwd)
                            , base: path.dirname(filepath)
                            , path: path.resolve(filepath)
                            }))
      })
    })
  })
}
