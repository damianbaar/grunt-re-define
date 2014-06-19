var redefine    = require('re-define')
  , _           = require('lodash')
  , through     = require('through2')
  , path        = require('path')

module.exports = function(grunt) {

  grunt.registerMultiTask('redefine', 'anything to anything converter', function() {
    var done = this.async()
      , config = _.merge(_.omit(this.data, 'files'), this.options())
      , base = config.base

    if(config.excludeDeps) config.excludeDeps = config.externals.split(',')
    if(config.map)         config.externals   = config.map.split(',')

    config = redefine.config(config)

    this.files.forEach(function(f) {
      if(!base) config.base = f.orig.cwd

      config.include = _(f.orig.src)
                       .map(function(f) { if(f.indexOf('#') > -1) return f })
                       .compact()
                       .value()

      var converter = redefine.fromPath(config)

      converter
        .pipe(through(function(result, enc, next) {
          grunt.log.writeln('File "' + f.dest + '" created.')
          grunt.file.write(f.dest, result)
          done()
        }))

      f.src.forEach(function(filepath) {
        var fp = path.resolve(config.base, filepath)

        if (!grunt.file.exists(fp)) grunt.log.warn('Source file "' + fp + '" not found.')
        else converter.write({path: fp})
      })

      converter.end()
    })
  })
}
