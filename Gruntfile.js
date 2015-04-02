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
                    src: ["*.less", ],
                    dest: destRoot + path + 'css/',
                    expand: true,
                    ext: ".css"
                }]
            }
        },
        cssmin: {
            options: {
                keepBreaks: true,
                rebase:false,
                restructuring:false,
                compatibility: 'ie8,+properties.spaceAfterClosingBrace'
            },
            target: {
                files: [{
                    expand: true,
                    cwd: destRoot+path,
                    src: ['css/main.css'],
                    dest: destRoot+path,
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
                    src: ['**/*.{png,jpg,gif}'],
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
                    src: ['**/*.min.js','css/*.htc', '**/*.css', '!jquery/**/*', '!plugins/jquery/**/*', 'plugins/**/*.{gif, eot, woff, woff2, ttf, svg}'],
                    dest: destRoot + path
                }]
            },
            fonts: {
                files: [{
                    expand: true,
                    cwd: srcRoot + path + 'fonts/',
                    src: ['**/*'],
                    dest: destRoot + path + 'fonts/'
                }]
            },
            js: {
                files: [{
                    expand: true,
                    cwd: srcRoot + path + 'js/',
                    src: ['*.js'],
                    dest: destRoot + path + 'js/'
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
            options: {
                livereload: true
            },
            config: {
                files: ['Gruntfile.js'],
                options: {
                    reload: true
                }
            },
            layout: {
                files: [srcRoot + 'layout.jade'],
                tasks: ['jade'],
            },
            scripts: {
                files: [srcRoot + path + 'coffee/*.coffee'],
                tasks: ['coffee'],
            },
            styles: {
                files: [srcRoot + path + 'css/*.less', path + '_less/*.less'],
                tasks: ['less']
            },
            jade: {
                files: [srcRoot + '*.jade', '!layout.jade'],
                tasks: ['jade']
            },
            plaginsscript: {
                files: [srcRoot + path + 'js/*.js', path + 'plagins/**/*.js'],
                tasks: ['uglify']
            },
            plaginsstyles: {
                files: [srcRoot + path + 'plagins/**/*.css'],
            },
        },
        sprite: {
            main: {
                src: srcRoot + path + 'ico/btn-def/*.png',
                dest: srcRoot + path + 'img/main-btn-def.png',
                imgPath: path + 'img/',
                algorithm: 'top-down',
                cssFormat: 'css',
                destCss: srcRoot + path + 'ico/btn-def/sprite.css'
            }
        },
        clean: {
            all: {
                src: destRoot
            }
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

    grunt.registerTask('cl', ['clean','coffee', 'uglify', 'copy', 'less','cssmin','jade','imagemin']);
    grunt.registerTask('default', ['watch:livereload']);
};
