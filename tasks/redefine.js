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

    config.name = this.target

  // var options = 
  //   { base           : program.base
  //   , main           : program.main
  //   , wrapper        : program.wrapper
  //   , returns        : program.returns
  //   , names          : program.names
  //   , excludeDepsRef : program.excludeDepsRef
  //   , globals        : program.globals
  //   }
  //
  // //CUSTOM TRANSFORMS
  // var findExternal = require('re-define-include-external')({
  //     external     : program.external || []
  //   , discoverable : program.discoverable || ['node_modules', 'bower_component']
  //   , descriptors  : program.descriptors || ['package.json', 'bower.json']
  //   , skip         : program.skip
  //   })



    // if(config.excludeDeps) config.excludeDeps = config.externals.split(',')
    // if(config.map)         config.map = _.map(config.map, function(k,v) { return v + '#' + k })
    // if(config.external)    config.include = _.map(config.external, function(k,v) { return k + '#' + v})
    //
    //
    var bundle = redefine
      .bundle(redefine.config(_.omit(config, 'transforms')), config.transforms)

    bundle.pipe(through(function(result, enc, next) {
      grunt.log.writeln('File "' + config.main + '" created.')
      grunt.file.write(config.dest, result)
      done()
    }))

    bundle.write(new File({path: path.resolve(config.main), cwd: config.base}))
    //
    // this.files.forEach(function(f) {
    //   if(!base) config.base = f.orig.cwd
    //
    //   var converter = redefine.fromPath(config)
    //
    //   converter
    //     .pipe(through(function(result, enc, next) {
    //       grunt.log.writeln('File "' + f.dest + '" created.')
    //       grunt.file.write(f.dest, result)
    //       done()
    //     }))
    //
    //   f.src.forEach(function(filepath) {
    //     var fp = path.resolve(config.base, filepath)
    //
    //     if (!grunt.file.exists(fp)) grunt.log.warn('Source file "' + fp + '" not found.')
    //     else converter.write({path: fp})
    //   })
    //
    //   converter.end()
    // })
  })
}
