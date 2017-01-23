module.exports = function(context) {
    var childProcess = require('child_process');
    var isRelease = context.opts.options.release;
    var taskName = isRelease ? 'build' : 'build:dev';

    console.info('\n> Running "' + taskName + '" Npm task\n');

    var preBuild = childProcess.spawn(
        'npm',
        [
            'run-script',
            taskName,
            '--',
            '--release',
            isRelease
        ],
        {stdio: 'inherit'}
    );

    return new Promise(function (aResolve, aReject) {
        preBuild.on('error', function (aError) {
            aReject(new Error(aError.message));
        });

        preBuild.on('close', function (aCode, aSignal) {
            if (aSignal) {
                aReject(new Error('Npm task "' + taskName + '" was terminated with signal ' + aSignal));
            } else if (aCode) {
                aReject(new Error('Npm task "' + taskName + '" exited with code ' + aCode));
            } else {
                aResolve();
            }
        });
    });
}
