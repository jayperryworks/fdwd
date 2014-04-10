module.exports = function(grunt) {
  // Load all Grunt tasks
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    watch: {
      compass: {
        files: ['assets/_scss/**/*.{scss,sass}'],
        tasks: ['compass:dev', 'copy:assets'], //'autoprefixer:server'
        options: {
          livereload: true
        }
      },
      assets: {
        files: ['assets/{js,fonts,images}/**'],
        tasks: ['copy:assets'],
        options: {
          livereload: true
        }
      },
      bower_concat: {
        files: '_bower_components/**/*.{js,css,html}',
        tasks: ['bower_concat'],
        options: {
          livereload: true
        }
      },
      // autoprefixer: {
      //   files: ['assets/css/**/*.css'],
      //   tasks: ['copy:stageCss', 'autoprefixer:server']
      // },
      jekyll: {
        files: [
          '*.html',
          '*.yml',
          '*.md',
          '_posts/**',
          '_includes/**',
          '_layouts/**',
          '_data/**'
        ],
        tasks: ['jekyll:build']
      },
      livereload: {
        options: {
          livereload: '<%= connect.options.livereload %>'
        },
        files: [
          '_site/*'
        ]
      }
    },

    // run jekyll build, etc. in command line
    // exec: {
    //   build: {
    //     cmd: 'bundle exec jekyll build'
    //   },
    //   serve: {
    //     cmd: 'bundle exec jekyll serve'
    //   }
    // },

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
            '_site'
          ]
        }
      }
    },

    jekyll: {
      options: {
        bundleExec: true
      },
      serve: {
        options: {
          serve: true,
          // Add the --watch flag, i.e. rebuild on file changes
          watch: true
        }
      },
      build: {
        options: {
          serve: false
        }
      }
    },

    compass: {
      options: {
        require: ['singularitygs', 'breakpoint', 'bourbon'],
        bundleExec: true,
        sassDir: 'assets/_scss',
        cssDir: 'assets/css',
        imagesDir: 'assets/images',
        fontsDir: 'assets/fonts',
        javascriptsDir: 'assets/js'
      },
      dev: {
        options: {
          debugInfo: false,
          outputStyle: 'expanded'
        }
      },
      deploy: {
        options: {
          debugInfo: false,
          outputStyle: 'compact',
          environment: 'production'
        }
      }
    },

    bower_concat: {
      all: {
        dest: 'assets/js/libs.js',
        exclude: [
          'jquery',
          'modernizr',
          'normalize'
        ]
      }
    },

    copy: {
      bower: {
        expand: true, 
        flatten: true,
        src: ['_bower_components/{jquery/dist/jquery.min.js,modernizr/modernizr.js}'], 
        dest: 'assets/js/vendor/',
        filter: 'isFile'
      },
      assets: {
        expand: true,
        src: [
          'assets/**/*',
          // Like Jekyll, exclude files & folders prefixed with an underscore.
          '!**/_*{,/**}'
        ],
        dest: '_site/',
        filter: 'isFile'
      }
    },

    clean: {
      assets: ["_site/assets/*"]
    },

    // concat: {   
    //   dist: {
    //     src: [
    //       '<%= bower_concat.dest %>', // All JS in the libs folder
    //       'assets/js/main.js'  // This specific file
    //     ],
    //     dest: 'assets/js/app.js'
    //   }
    // }

    concurrent: {
      serve: ['watch', 'jekyll:serve']
    }
  });

  grunt.registerTask('default', [
    'bower_concat',
    'compass:dev',
    'copy:bower',
    'copy:assets', 
    'jekyll:build',
    'connect:livereload',
    'watch'
  ]);

};