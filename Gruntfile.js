var srcRoot = 'public/',
    destRoot = 'www/',
    path = 'assets/';
module.exports = function(grunt) {
    grunt.initConfig({
        meta: {
            srcRoot: srcRoot,
            destRoot: destRoot,
            path: path
        },
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            build: {
                files: {
                    // 'public/js/vendor/selectivizr.min.js':['public/js/vendor/selectivizr.js']
                }
            }
        },
        less: {
            options: {
                sourceMap: true,
                outputSourceFiles: true,
                sourceMapRootpath: srcRoot,
                ieCompat: true,
                expand: true,
            },
            main: {
                options: {
                    sourceMapFilename: srcRoot + path + 'css/main.css.map',
                    sourceMapURL: 'main.css.map',
                },
                files: {
                    '<%= meta.srcRoot + meta.path %>css/main.css': '<%= meta.srcRoot + meta.path %>css/main.less'
                }
            },
            bootstrap: {
                options: {
                    sourceMapFilename: srcRoot + path + 'plugins/bootstrap/less/bootstrap.css.map',
                    sourceMapURL: 'bootstrap.css.map',
                },
                files: {
                    '<%= meta.srcRoot + meta.path %>plugins/bootstrap/less/bootstrap.css': '<%= meta.srcRoot + meta.path %>plugins/bootstrap/less/bootstrap.less',
                }
            },
            fuelux: {
                options: {
                    sourceMapFilename: srcRoot + path + 'plugins/fuelux/less/fuelux.css.map',
                    sourceMapURL: 'fuelux.css.map',
                },
                files: {
                    '<%= meta.srcRoot + meta.path %>plugins/fuelux/less/fuelux.css': '<%= meta.srcRoot + meta.path %>plugins/fuelux/less/fuelux.less',
                }
            }

        },
        autoprefixer: {
            options: {
                browsers: ['last 2 versions', 'ie 8', 'ie 9'],
                map: true
            },
            main: {
                src: srcRoot + path + 'css/main.css'
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
                    cwd: srcRoot + path,
                    src: ['css/main.css'],
                    dest: destRoot + path,
                    ext: '.css'
                },{
                    expand: true,
                    cwd: srcRoot + path + 'plugins/',
                    src: [
                        'bootstrap/less/bootstrap.css',
                        'fuelux/less/fuelux.css',
                    ],
                    dest: destRoot + path + 'plugins/',
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
                    src: ['**/*.min.js', 'css/*.htc', '!**/_*', 'css/*.css','fonts/webfonts/*', '!fonts/webfonts/*.css', 'js/*.js', '!plugins/**/*'],
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
                options: {
                    livereload: true
                },
                files: [srcRoot + '**/*']
            },
            main: {
                options: {
                    livereload: true,
                    nospawn: true
                },
                files: srcRoot + path + 'css/main.less',
                tasks: ['less:main', 'autoprefixer:main']
            },
            bootstrap: {
                options: {
                    livereload: true,
                    nospawn: true
                },
                files: srcRoot + path + 'plugins/bootstrap/less/*.less',
                tasks: ['less:bootstrap']
            },
            fuelux: {
                options: {
                    livereload: true,
                    nospawn: true
                },
                files: srcRoot + path + 'plugins/fuelux/less/*.less',
                tasks: ['less:fuelux']
            },
            options: {
                livereload: true
            }
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
        fontgen: {
            all: {
                options: {
                    path_prefix: '../fonts/webfonts/',
                    // stylesheet: srcRoot + path + 'fonts/fonts.css',
                },
                files: [{
                    src: srcRoot + path + 'fonts/*.ttf',
                    dest: srcRoot + path + 'fonts/webfonts'
                }]
            }
        },
        concat: {
            fontsstyles: {
                src: srcRoot + path + 'fonts/webfonts/*.css',
                dest: srcRoot + path + '_less/fonts.less'
            }
        },
        clean: {
            all: {
                src: destRoot + path
            }
        },
        connect: {
            server:{
                options: {
                    port: 9000
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-coffee');
    grunt.loadNpmTasks('grunt-contrib-jade');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-newer');
    grunt.loadNpmTasks('grunt-fontgen');
    grunt.loadNpmTasks('grunt-spritesmith');

    grunt.registerTask('default', ['newer:coffee', 'newer:uglify', 'copy', 'newer:less', 'newer:autoprefixer', 'cssmin', 'jade', 'newer:imagemin']);
    grunt.registerTask('server', ['connect','watch']);
    grunt.registerTask('prod', ['clean', 'coffee', 'uglify', 'copy', 'less', 'autoprefixer', 'cssmin', 'jade', 'imagemin']);
    grunt.registerTask('fonts', ['fontgen','concat']);

};
