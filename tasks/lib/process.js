
module.exports = function (grunt, target, done) {
    var appiumPath = require.resolve('appium');
    var spawn = require('child_process').spawn;

    if (!process._appium) {
      process._appium = {};
    }

    function killAppium () {
        process._appium[target].kill('SIGTERM');
        process._appium[target] = null;
    }

    function start (options, done) {
        var child = spawn('node', [appiumPath, '&']);
        process._appium[target] = child;

        child.stdout.on('data', function(data) {});

        child.stdout.on('end', function(data) {
            done();
        });
    }

    function stop (options, done) {
        killAppium();
        done();
    }

    return {
        start: start,
        stop: stop
    }
};