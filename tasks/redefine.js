var redefine    = require('re-define')
  , through     = require('through2')
  , path        = require('path')
  , Module      = require('re-define-module')
  , _           = require('lodash')

module.exports = function(grunt) {

  grunt.registerMultiTask('redefine', 'anything to anything converter', function() {
    var done = this.async()
      , config = _.merge(_.omit(this.data, 'files'), this.options())
      , base = config.base

    var args = this.nameArgs.split(':')
      , idx = args.indexOf(this.target)
      , mode = args[idx + 1]
      , buildConfig = config.builds[mode]

    grunt.log.writeln('Running in:', mode ? mode : 'normal', 'mode.'
                     , 'Configuration', mode ? (buildConfig ? 'exists.' : 'not exists!') : 'exists')

    if(!config.project) config.project = this.target
    if(!_.isEmpty(config.imports) && !_.isArray(config.imports)) {
      config.exclude = 
        (config.exclude || []).concat(
          _(config.imports).values().flatten().value() || [])

      config.imports = _.keys(config.imports)
    }

    this.files.forEach(function(f) {
      var conf = redefine.config(_.extend(_.omit(config, 'transforms')
                                         ,_.omit(buildConfig, 'transforms')))

      conf.cwd = !!f.cwd ? f.cwd : '.'
      conf.slice = config.slice || conf.slice

      var bundle = redefine.bundle(conf, _.extend(config.transforms, buildConfig && buildConfig.transforms))

      bundle.pipe(through.obj(function(file, enc, next) {
        var _p = _.keys(config.slice).length > 1 
                    ? file.path 
                    : ((buildConfig && buildConfig.dest) || f.dest || file.path)

        grunt.log.writeln('File "' + _p + '" created.')
        grunt.file.write(_p, file.contents)

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

        bundle.write(Module({ path: path.resolve(filepath) }))
      })
    })
  })
}
