/*
 * grunt-nodequnit
 * http://gruntjs.com/
 *
 * Copyright (c) 2012 Tim Branyen (@tbranyen)
 * Adapted from grunt-contrib-qunit - "Cowboy" Ben Alman, contributors and
 * grunt-node-qunit - Parashuram.
 *
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Nodejs libs.
  var path = require('path');

  // For running QUnit in Node.js.
  var qunit = require('qunit');

  grunt.registerMultiTask('nodequnit', 'Run QUnit tests in the Node.js environment.', function() {
    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
      // Default PhantomJS timeout.
      timeout: 5000,
      // Ignore all output.
      log: {
        assertions: false,
        errors: false,
        tests: false,
        summary: false,
        globalSummary: false,
        testing: false,
      },
      // Code Coverage via Istanbul.
      coverage: false,
      // Injectable dependencies.
      deps: [],
      // Where the code is located, default to current directory.
      code: '.',
      // Label.
      label: 'node.js',
    });

    var label = options.label;

    // This task is asynchronous.
    var done = this.async();

    // Maintain references to qunit functions.
    var assertion = qunit.log.assertion;
    var summary = qunit.log.summary;

    // Keep track of failed assertions.
    var failedAssertions = [];

    // Allow an error message to retain its color when split across multiple lines.
    var formatMessage = function(str) {
      return String(str).split('\n').map(function(s) {
        return s.magenta;
      }).join('\n');
    };

    var logFailedAssertions = function() {
      var assertion;
      // Print each assertion error.
      while ((assertion = failedAssertions.shift())) {
        // Print each assertion error.
        grunt.verbose.or.error(assertion.test);
        grunt.log.error('Message: ' + formatMessage(assertion.message));

        if (assertion.source) {
          grunt.log.error(assertion.source.replace(/ {4}(at)/g, '  $1'));
        }
        grunt.log.writeln();
      }
    };

    // Process each filepath in-order.
    options.tests = this.files[0].src;

    // Display a friendly label.
    grunt.verbose.subhead('Testing ' + label).or.write('Testing ' + label);

    // Start Node QUnit.
    grunt.event.emit('nodequnit.spawn', options);

    qunit.log.assertion = function(assertion) {
      if (!assertion.result) {
        failedAssertions.push(assertion);
      }
    };

    qunit.log.test = function(options) {
      // Log errors if necessary, otherwise success.
      if (options.failed > 0) {
        // list assertions
        if (grunt.option('verbose')) {
          grunt.log.error();
          logFailedAssertions();
        } else {
          grunt.log.write('F'.red);
        }
      } else {
        grunt.verbose.ok().or.write('.');
      }
    };

    qunit.log.summary = function() {
      grunt.log.ok();

      // Proxy through.
      summary.apply(this, arguments);
    };

    // Run the tests.
    qunit.run(options, function(err, result) {
      if (err) {
        // If there was an error, abort the series.
        return done(false);
      }

      // Log results.
      if (result.failed > 0) {
        grunt.log.writeln();

        // Log out the failed assertions.
        logFailedAssertions();

        grunt.warn(result.failed + '/' + result.assertions +
          ' assertions failed (' + result.runtime + 'ms)', Math.min(99, 90 +
            result.failed));

        return done(false);
      }
      grunt.log.ok(result.passed + ' assertions passed (' + result.runtime +
        'ms)');

      // Success!
      return done();
    });
  });
};
