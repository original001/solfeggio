// сделать префисы !!!!!!
var srcRoot = 'public/',
    destRoot = 'www/',
    path = 'assets/';
module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            build: {
                files: {
                    // 'public/js/vendor/selectivizr.min.js':['public/js/vendor/selectivizr.js']
                }
            }
        },
        less: {
            development: {
                files: [{
                    cwd: srcRoot + path + 'css/',
                    src: ["*.less"],
                    dest: destRoot + path + 'css/',
                    expand: true,
                    ext: ".css"
                }, {
                    cwd: srcRoot + path + 'plugins/',
                    // src: ['bootstrap/less/bootstrap.less', 'fuelux/less/fuelux.less'],
                    dest: destRoot + path + 'plugins/',
                    expand: true,
                    ext: ".css"
                }]
            }
        },
        cssmin: {
            options: {
                keepBreaks: true,
                rebase: false,
                restructuring: false,
                compatibility: 'ie8,+properties.spaceAfterClosingBrace'
            },
            target: {
                files: [{
                    expand: true,
                    cwd: destRoot + path,
                    src: ['css/main.css'],
                    dest: destRoot + path,
                    ext: '.css'
                }]
            }
        },
        jade: {
            compile: {
                options: {
                    client: false,
                    pretty: true
                },
                files: [{
                    cwd: srcRoot,
                    src: ["*.jade", "!layout.jade"],
                    dest: destRoot,
                    expand: true,
                    ext: ".html"
                }]
            }
        },
        imagemin: {
            dynamic: {
                options: {
                    optimizationLevel: 7
                },
                files: [{
                    expand: true,
                    cwd: srcRoot + path + 'img/',
                    src: ['**/*.{png,jpg,gif,svg}'],
                    dest: destRoot + path + 'img/'
                }]
            }
        },
        coffee: {
            scripts: {
                expand: true,
                flatten: true,
                cwd: srcRoot + path + 'js/',
                src: ['*.coffee'],
                dest: destRoot + path + 'js/',
                ext: '.js'
            }
        },
        copy: {
            front: {
                files: [{
                    expand: true,
                    cwd: srcRoot + path,
                    src: ['**/*.min.js', 'css/*.htc', '!**/_*', 'css/*.css','fonts/**/*','js/*.js','!plugins/**/*'],
                    dest: destRoot + path
                }]
            },
            plugins: {
                files: [{
                    expand: true,
                    cwd: srcRoot + path + 'plugins/',
                    src: [
                        '**/*.css',
                        '**/*.min.js',
                        '!jquery/**/*',
                        '!bootstrap/dist/**/*',
                        '!fuelux/dist/**/*',
                        '!**/_*'
                        // '**/*.gif',
                        // '**/*.eot',
                        // '**/*.woff',
                        // '**/*.woff2',
                        // '**/*.ttf',
                        // '**/*.svg',
                        //
                        // 'bootstrap/js/affix.js',
                        // 'bootstrap/js/alert.js',
                        // 'bootstrap/js/button.js',
                        // 'bootstrap/js/carousel.js',
                        // 'bootstrap/js/collapse.js',
                        // 'bootstrap/js/dropdown.js',
                        // 'bootstrap/js/modal.js',
                        // 'bootstrap/js/popover.js',
                        // 'bootstrap/js/scrollspy.js',
                        // 'bootstrap/js/tab.js',
                        // 'bootstrap/js/tooltip.js',
                        // 'bootstrap/js/transition.js',
                        // 'fuelux/js/radio.js',
                        // 'fuelux/js/checkbox.js',
                        // 'fuelux/js/selectlist.js',
                        // 'fuelux/js/datepicker.js',
                        // 'fuelux/js/infinite-scroll.js',
                    ],
                    dest: destRoot + path + 'plugins/'
                }]
            }
        },
        watch: {
            livereload: {
                options: {livereload: true},
                files: [srcRoot + '**/*']
            },
            options: {livereload: true}
        },
        sprite: {
            main: {
                src: srcRoot + path + 'ico/*.png',
                dest: srcRoot + path + 'img/ico.png',
                imgPath: path + 'img/',
                // algorithm: 'top-down',
                cssFormat: 'css',
                destCss: srcRoot + path + 'ico/sprite.css'
            }
        },
        clean: {
            all: {src: destRoot + path}
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-coffee');
    grunt.loadNpmTasks('grunt-contrib-jade');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-newer');
    grunt.loadNpmTasks('grunt-spritesmith');

    grunt.registerTask('default', ['newer:coffee', 'newer:uglify', 'copy', 'newer:less', 'cssmin', 'jade', 'newer:imagemin']);
    grunt.registerTask('server', ['watch:livereload']);
    grunt.registerTask('prod', ['clean', 'coffee', 'uglify', 'copy', 'less', 'cssmin', 'jade', 'imagemin'])
};
