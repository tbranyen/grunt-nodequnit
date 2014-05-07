# Node.js QUnit Grunt plugin.
module.exports = ->

  # Initialize the development configuration.
  @initConfig

    # Lint the Grunt config and plugin source.
    jshint:
      options:
        jshintrc: true
      all: ["Gruntfile.js", "tasks/**/*.js"]

  # Load the necessary tasks to run this plugin.
  @loadTasks "tasks"
  @loadNpmTasks "grunt-contrib-jshint"

  # By default, lint.
  @registerTask "default", ["jshint"]
