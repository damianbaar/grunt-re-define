var redefine    = require('re-define')
  , _           = require('lodash')
  , through     = require('through2')
  , path        = require('path')
  , File        = require('vinyl')

module.exports = function(grunt) {

  grunt.registerMultiTask('redefine', 'anything to anything converter', function() {
    var done = this.async()
      , config = _.merge(_.omit(this.data, 'files'), this.options())
      , base = config.base

    var bundle = redefine
      .bundle(redefine.config(_.omit(config, 'transforms')), config.transforms)

    bundle.pipe(through(function(result, enc, next) {
      grunt.log.writeln('File "' + config.dest + '" created.')
      grunt.file.write(config.dest, result)
      done()
    }))

    bundle.write(new File({path: path.resolve(config.main), cwd: config.base}))
  })
}
