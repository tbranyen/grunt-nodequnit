grunt-nodequnit
===============

A Grunt task for running running QUnit tests in the Node.js environment, leveraging [node-qunit](https://github.com/kof/node-qunit).

-----------------

## Technologies

* __[Grunt](http://gruntjs.com/)__: a JavaScript Task Runner. 
* __[Node-Qunit](https://github.com/kof/node-qunit)__ : a Qunit testing framework for Node.js
* __[QUnit](http://qunitjs.com/)__ : a powerful, easy-to-use JavaScript unit test suite used by the jQuery, jQuery UI and jQuery Mobile projects and is capable of testing any generic JavaScript code, including itself! 

## Usage

```bash
npm i -D grunt-nodequnit
```

In `Gruntfile.js`:

```javascript
grunt.loadNpmTasks('grunt-nodequnit');

grunt.initConfig({
    nodequnit: {
        // options, see below...
    }
};
```

## Options

* __timeout__: Default PhantomJS timeout
* __log__: Logging options - all are off by default
* __coverage__: Run `istanbul` code coverage
* __deps__: Injectable dependencies, which are required before code
* __code__: Where the code is located, default to current directory
* __label__: Label for test

## Example (with defaults)

```
grunt.initConfig({
    //....
    nodequnit: {
      timeout: 5000,
      log: {
        assertions: false,
        errors: false,
        tests: false,
        summary: false,
        globalSummary: false,
        testing: false,
      },
      coverage: false,
      deps: [],
      code: ".",
      label: "node.js",
    },
    // ....
});
```
