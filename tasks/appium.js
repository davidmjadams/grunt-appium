/*
 * grunt-appium
 * https://github.com/hungrydavid/grunt-appium
 *
 * Copyright (c) 2015 David Adams
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks
  grunt.registerMultiTask('appium', 'Grunt plugin for running appium', function() {

    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({});
    var appiumPath = require.resolve('appium');
    var spawn = require('child_process').spawn;
    var done = this.async();

    var child = spawn('node', [appiumPath], function (err) {
        console.log(err);
    });

    process.on('exit', function(data) {
        done();
        child.kill("SIGTERM");
    });
  });
};
