module.exports = function(grunt) {

    grunt.initConfig({
        coffee: {
            compile: {
                options: {
                    join: true
                },
                files: {
                    'app/frontend/public/js/application.js' : ['app/frontend/scripts/application.js.coffee', 'app/frontend/scripts/plugins.js.coffee']
                }
            }
        },
        compass: {
            develop: {
                options: {
                    sassDir: 'app/frontend/styles/',
                    cssDir: 'app/frontend/public/css'
                }
            },
            production: {
                options: {
                    sassDir: 'app/frontend/styles/',
                    cssDir: 'app/frontend/public/css',
                    outputStyle: 'compressed',
                    noLineComments: true,
                    boring: true,
                    environment: 'production',
                    force: true
                }
            }
        },
        uglify: {
          options: {
              compress: {
                  drop_console: true
              }
          },
          targ: {
              files: { 'app/frontend/public/js/application.min.js' : ['app/frontend/public/js/application.js'] }
          }
        },
        watch: {
            options: {
                // atBegin: true
            },
            livereload: {
                options: {
                    livereload: true
                },
                files: ['app/frontend/public/js/application.js', 'app/frontend/public/css/app.css', 'app/frontend/public/css/main.css', 'app/frontend/public/css/normalize.css']
            },
            styles: {
                files: ['app/frontend/styles/app.css.scss'],
                tasks: ['compass:develop'],
                options: {
                    debounceDelay: 500,
                }
            },
            scripts: {
                files: ['app/frontend/scripts/plugins.js.coffee', 'app/frontend/scripts/application.js.coffee'],
                tasks: ['coffee'],
                options: {
                    debounceDelay: 500,
                }
            }
        }
    });
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-coffee');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.registerTask('default', ['compass:develop', 'watch']);

    grunt.registerTask('deploy', ['compass:production', 'coffee', 'uglify']);
};