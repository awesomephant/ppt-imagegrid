module.exports = function (grunt) {

    grunt.initConfig({
        sass: {
            options: {
                sourceMap: false
            },
            dist: {
                files: {
                    './assets/css/input.css': './sass/main.scss'
                }
            }
        },
        watch: {
            css: {
                files: ['./sass/*.scss'],
                tasks: ['sass'],
            }
        },
    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-sass');
    grunt.registerTask('default', ['watch']);
};