module.exports = function(grunt) {
  // Load all Grunt tasks
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    watch: {
      compass: {
        files: ['<%= yeoman.app %>/assets/_scss/**/*.{scss,sass}'],
        tasks: ['compass:server', 'autoprefixer:server']
      },
      autoprefixer: {
        files: ['<%= yeoman.app %>/assets/css/**/*.css'],
        tasks: ['copy:stageCss', 'autoprefixer:server']
      },
      jekyll: {
        files: [
          '<%= yeoman.app %>/**/*.{html,yml,md,mkd,markdown}',
          '!<%= yeoman.app %>/_bower_components/**/*'
        ],
        tasks: ['jekyll:server']
      },
      livereload: {
        options: {
          livereload: '<%= connect.options.livereload %>'
        },
        files: [
          '.jekyll/**/*.html',
          '.tmp/assets/css/**/*.css',
          '{.tmp,<%= yeoman.app %>}/<%= js %>/**/*.js',
          '<%= yeoman.app %>/assets/images/**/*.{gif,jpg,jpeg,png,svg,webp}'
        ]
      }
    },

    connect: {
      options: {
        port: 4000,
        livereload: 35729,
        // change this to '0.0.0.0' to access the server from outside
        hostname: 'localhost'
      },
      livereload: {
        options: {
          open: false,
          base: [
            '.tmp',
            '.jekyll',
            '<%= yeoman.app %>'
          ]
        }
      }
    },

    // compass: {
    //   options: {
    //     // If you're using global Sass gems, require them here.
    //     require: ['singularitygs', 'breakpoint', 'toolkit', 'bourbon'],
    //     bundleExec: true,
    //     sassDir: '<%= yeoman.app %>/assets/_scss',
    //     cssDir: '.tmp/assets/css',
    //     imagesDir: '<%= yeoman.app %>/assets/images',
    //     javascriptsDir: '<%= yeoman.app %>/assets/js',
    //     relativeAssets: false,
    //     httpImagesPath: '/assets/images',
    //     httpGeneratedImagesPath: '/assets/images/generated',
    //     outputStyle: 'expanded',
    //     raw: 'extensions_dir = "<%= yeoman.app %>/_bower_components"\n'
    //   },
    //   dist: {
    //     options: {
    //       generatedImagesDir: '<%= yeoman.dist %>/assets/images/generated'
    //     }
    //   },
    //   server: {
    //     options: {
    //       debugInfo: true,
    //       generatedImagesDir: '.tmp/assets/images/generated'
    //     }
    //   }
    // },

    bower_concat: {
      all: {
        dest: 'assets/js/bower.js',
        exclude: [
            'jquery',
            'modernizr'
        ]
      }
    },

    concat: {   
      dist: {
        src: [
            'assets/js/bower_libs.js', // All JS in the libs folder
            'assets/js/main.js'  // This specific file
        ],
        dest: 'assets/js/app.js',
      }
    }
  });

  // grunt.loadNpmTasks('grunt-contrib-uglify');
  // grunt.loadNpmTasks('grunt-contrib-jshint');
  // grunt.loadNpmTasks('grunt-contrib-qunit');
  // grunt.loadNpmTasks('grunt-contrib-watch');
  // grunt.loadNpmTasks('grunt-contrib-concat');

  grunt.registerTask('default', [
    'jshint', 
    'qunit', 
    'concat', 
    'uglify'
  ]);

};