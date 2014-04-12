module.exports = function(grunt) {
  // Load all Grunt tasks
  require('load-grunt-tasks')(grunt);

  grunt.loadNpmTasks('grunt-grunticon');

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    fdwd: {
      bower: '_bower_components',
      jekyll: '_site',
      assets: 'assets',
      images: '<%= fdwd.assets %>/images',
      fonts: '<%= fdwd.assets %>/fonts',
      scss: '<%= fdwd.assets %>/_scss',
      css: '<%= fdwd.assets %>/css',
      js: '<%= fdwd.assets %>/js'
    },

    watch: {
      icons: {
        files: ['<%= fdwd.assets %>/_icons'],
        tasks: ['svgmin:dev, grunticon:dev']
      },
      compass: {
        files: ['<%= fdwd.scss %>/**/*.{scss,sass}'],
        tasks: ['compass:dev', 'copy:assets'], //'autoprefixer:server'
        options: {
          livereload: true
        }
      },
      assets: {
        files: ['assets/{js,fonts,images,css}/**'],
        tasks: ['copy:assets'],
        options: {
          livereload: true
        }
      },
      bower_concat: {
        files: '<%= fdwd.bower %>/**/*.{js,css,html}',
        tasks: ['bower_concat'],
        options: {
          livereload: true
        }
      },
      // autoprefixer: {
      //   files: ['<%= fdwd.css %>/**/*.css'],
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
        sassDir: '<%= fdwd.scss %>',
        cssDir: '<%= fdwd.css %>',
        imagesDir: '<%= fdwd.images %>',
        fontsDir: '<%= fdwd.fonts %>',
        javascriptsDir: '<%= fdwd.js %>'
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

    // imagemin: {
    //   dist: {
    //     options: {
    //       progressive: true
    //     },
    //     files: [{
    //       expand: true,
    //       cwd: '<%= yeoman.dist %>',
    //       src: '**/*.{jpg,jpeg,png}',
    //       dest: '<%= yeoman.dist %>'
    //     }]
    //   }
    // },

    svgmin: {
      dev: {
        files: [{
          expand: true,
          flatten: true,
          // cwd: '<%= yeoman.dist %>',
          src: '<%= fdwd.assets %>/_icons/*.svg',
          dest: '<%= fdwd.assets %>/.svgmin/'
        }]
      }
    },

    grunticon: {
      dev: {
        files: [{
          expand: true,
          cwd: 'assets/',
          src: ['.svgmin/*'],
          dest: '<%= fdwd.assets %>/css'
        }],
        options: {
          loadersnippet: '../../_includes/grunticon_loader.js',
          pngfolder: '../images/icons/',
          previewhtml: '../../grunticon-preview.html'
          // colors: {
          //   highlight: '#3da288', // green
          //   dark: '#293F47', // blue
          //   reverse: '#fff' // white
          // }
        }
      }
    },

    bower_concat: {
      all: {
        dest: '<%= fdwd.js %>/libs.js',
        exclude: [
          'jquery',
          'modernizr',
          'normalize-css'
        ]
      }
    },

    copy: {
      bower: {
        expand: true, 
        flatten: true,
        src: ['<%= fdwd.bower %>/{jquery/dist/jquery.min.js,modernizr/modernizr.js}'], 
        dest: '<%= fdwd.js %>/vendor/',
        filter: 'isFile'
      },
      normalize: {
        expand: true, 
        flatten: true,
        src: ['<%= fdwd.bower %>/normalize-css/normalize.css'], 
        dest: '<%= fdwd.css %>',
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

    // clean: {
    //   assets: ["_site/assets/*"]
    // },

    // concat: {   
    //   dist: {
    //     src: [
    //       '<%= bower_concat.dest %>', // All JS in the libs folder
    //       '<%= fdwd.js %>/main.js'  // This specific file
    //     ],
    //     dest: '<%= fdwd.js %>/app.js'
    //   }
    // }

    concurrent: {
      serve: ['watch', 'jekyll:serve']
    }
  });

  grunt.registerTask('default', [
    'svgmin:dev',
    'grunticon:dev',
    'compass:dev',
    'bower_concat',
    'copy:bower',
    'copy:normalize',
    'copy:assets',
    'jekyll:build',
    'connect:livereload',
    'watch'
  ]);

};