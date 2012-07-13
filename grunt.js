/*global config:true, task:true*/
module.exports = function(grunt) {

  grunt.initConfig({
    pkg : '<json:package.json>',
    meta : {
      banner :  '/**\n' +
                '* <%= pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("m/d/yyyy") %>\n' +
                '* <%= pkg.homepage %>\n' +
                '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;\n' +
                '* Underscore.Nest is freely distributable under the MIT license.\n' +
                '*/'
    },

    min : {
      nest : {
        dest : "underscore.nest.min.js",
        src : [
          "<banner>",
          "underscore.nest.js"
        ]
      }
    },

    qunit : {
      urls : [ 
        "http://localhost:8000/test/index.html"
      ]
    },

    lint : {
      files : [
        "grunt.js",
        "underscore.nest.js",
        "test/unit/**/*.js"
      ]
    },

    watch : {
      files : "<config:lint.files>",
      tasks : "lint qunit"
    },

    jshint : {
      options : {
        unused : true,
        unuseds : true,
        devel : true,
        noempty : true,
        forin : false,
        evil : true,
        maxerr : 100,
        boss : true,
        curly : true,
        eqeqeq : true,
        immed : true,
        latedef : true,
        newcap : true,
        noarg : true,
        sub : true,
        undef : true,
        eqnull : true,
        browser : true,
        bitwise  : true,
        loopfunc : true,
        predef : [ "_", "exports", "define" ]
      },
      globals : {
        QUnit : true,
        module : true,
        test : true,
        asyncTest : true,
        expect : true,
        ok : true,
        equals : true,
        JSLitmus : true,
        start : true,
        stop : true,
        $ : true,
        strictEqual : true,
        raises : true
      }
    },

    uglify : {
      "mangle" : {
        "except" : [ "_", "$" ]
      },
      "squeeze" : {},
      "codegen" : {}
    }
  });

  // Default task.
  grunt.registerTask('default', 'lint qunit min');
};
