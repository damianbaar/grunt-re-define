var redefine    = require('re-define')
  , _           = require('lodash')
  , fs          = require('fs')
  , path        = require('path')
  , writeStream = _.compose(fs.createWriteStream, path.resolve)
  , readStream  = _.compose(fs.createReadStream, path.resolve)
  , through     = require('through2')

module.exports = function(grunt) {

  grunt.registerMultiTask('redefine', 'anything to anything converter', function() {
    var done = this.async()
      , config = _.merge(this.data.config, this.options())

    var source = readStream(config.base, config.main)
      , output = writeStream(path.resolve(config.output))

    config = redefine.config(config)

    source
      .pipe(redefine.convert(config))
      .pipe(through(function(a,b,c) {
        //TODO not sure why pipe.on finish does not work
        fs.writeFileSync(path.resolve(config.output), a.toString(), 'utf-8')
        done()
      }))
  })
}
