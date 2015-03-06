
module.exports = function (grunt, target, done) {
    var appiumPath = require.resolve('appium');
    var spawn = require('child_process').spawn,
        child;

    function killAppium () {
        process._appium[target].kill('SIGTERM');
        process._appium[target] = null;
    }

    function start (options, process) {

        child && child.kill();

        child = spawn('node', [appiumPath, '&']);

        child.stdout.on('data', function(data) {});

        process.on('exit', function(data) {
            child.kill("SIGTERM");
        });
    }

    function stop (options) {
        killAppium();
    }

    return {
        start: start,
        stop: stop
    }
};