module.exports = function(context) {
    var Q = context.requireCordovaModule('q');
    var deferred = new Q.defer();
    var spawn = require('child_process').spawn;
    var isRelease = context.opts.options.release;
    var taskName = isRelease ? 'build' : 'build-dev';

    console.info('\n> Running "' + taskName + '" Grunt task\n');

    var grunt = spawn('grunt', [taskName, '--stack', '--release', isRelease]);

    grunt.stdout.on('data', function(data) {
      process.stdout.write(data.toString());
    });
    grunt.stderr.on('data', function(data) {
      process.stderr.write(data.toString());
    });

    grunt.on('error', function (aError) {
        deferred.reject(new Error(aError.message));
    });
    grunt.on('exit', function (aCode) {
        if (aCode !== 0) {
            deferred.reject(new Error('Grunt task "' + taskName + '" exited with code ' + aCode));
        } else {
            deferred.resolve();
        }
    });

    return deferred.promise;
}
