module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    eslint: {
      files: [
        'Gruntfile.js',
        'client/app.js',
        'client/components/*.js',
        // 'client/**/*.js',
        '!client/test/*.js',
        '!client/lib/**/*.*',
        '!client/min/**/*.js'
      ],
      options: {
        globals: {
          jQuery: true
        }
      }
    },

    karma: {
      unit: {
        configFile: 'karma.conf.js'
      }
    },

    watch: {
      files: ['<%= eslint.files %>'],
      tasks: ['eslint']
    },

    concat: {
      options: {
        seperator: ';',
        stripBanners: true,
        banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
          '<%= grunt.template.today("yyyy-mm-dd") %> */',
      },
      dist: {
        src: [
          './client/components/app.js',
          './client/components/nav.js',
          './client/components/note-collection.js',
          './client/components/note.js',
          './client/components/checkbox.js'
        ],
        dest: './client/min/concat.js',
      },
    },

    uglify: {
      my_target: {
        files: {
          './client/min/ugly.js': ['./client/min/concat.js']
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-eslint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');

  grunt.registerTask('default', ['eslint']);
  grunt.registerTask('buildProductionCode', ['concat','uglify']);

};
