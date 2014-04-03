module.exports = function(grunt) {
  // Load all Grunt tasks
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    watch: {
      options: {
        // livereload: true
      },
      compass: {
        files: ['assets/_scss/**/*.{scss,sass}'],
        tasks: ['compass:dev'] //, 'autoprefixer:server'
      },
      // bower_concat: {
      //   files: '_bower_components/**/*.{js,css,html}',
      //   tasks: ['bower_concat']
      // },
      // autoprefixer: {
      //   files: ['assets/css/**/*.css'],
      //   tasks: ['copy:stageCss', 'autoprefixer:server']
      // },
      jekyll: {
        files: [
          '*.html',
          '*.yml',
          'assets/js/**.js',
          'assets/css/**.css',
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
    exec: {
      build: {
        cmd: 'bundle exec jekyll build'
      },
      serve: {
        cmd: 'bundle exec jekyll serve'
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
            '_site'
          ]
        }
      }
    },

    // jekyll: {
    //   options: {
    //     bundleExec: true,
    //     src: '.',
    //   },
    //   dev: {
    //     options: {
    //       dest: '_site',
    //       config: '_config.yml'
    //     }
    //   }
    // },

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
          debugInfo: true,
          outputStyle: 'expanded'
        }
      },
      deploy: {
        options: {
          debugInfo: false,
          // relativeAssets: false,
          // httpImagesPath: '/assets/images',
          // httpGeneratedImagesPath: '/assets/images/generated',
          outputStyle: 'compact',
          environment: 'production'
          // raw: 'extensions_dir = "_bower_components"\n'
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
      dev: {
        expand: true, 
        flatten: true,
        src: ['_bower_components/{jquery/dist/jquery.min.js,modernizr/modernizr.js}'], 
        dest: 'assets/js/vendor/',
        filter: 'isFile'
      },
      assets: {
        expand: true,
        src: ['assets/*'], 
        dest: '_site/assets/',
        filter: 'isFile'
      }
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
    // 'connect',
    'copy',
    'bower_concat', 
    'compass:dev',
    'jekyll:build',
    // 'exec:serve',
    // 'watch'
    // 'concurrent:serve'
    'connect:livereload',
    'watch'
  ]);

};