module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        jsonlint: {
            project: {
                src: ['package.json', 'bower.json', 'src/**/*.json', 'test/**/*.json']
            }
        },

        jshint: {
            files: ['Gruntfile.js', 'src/**/*.js', 'test/**/*.js']
        },

        jasmine: {
            bubble:{
                src: "src/adapters/jtal/**/*.js",
                options: {
                    specs: "tests/bubble/**/*.js",
                    vendor: [
                        "vendor/test/lib/*.js",
                        "node_modules/z-schema/dist/ZSchema-browser-min.js"
                    ],
                    keepRunner: false,
                    outfile: "vendor/test/lib/bubble/bubbleSpecRunner.html",
                    template: "vendor/test/lib/bubble/SpecRunner.html",
                    templateOptions:{
                        jTalSchema: grunt.file.read(process.cwd() + '/src/schemas/jtal/jtal_schema.json')
                    }
                }
            }
        },

        clean: {
            build: ["build/"]
        },

        copy: {
            srcToBuild:{
                files: [
                    {
                        expand: true,
                        cwd: 'src',
                        src: '**',
                        dest: 'build/uncompressed'
                    }
                ]
            }
        },

        bump: {
            options: {
                files: ['package.json', 'bower.json'],
                commitFiles: ['-a'],
                tagName: '%VERSION%',
                pushTo: 'origin',
                prereleaseName: false
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-jasmine');
    grunt.loadNpmTasks('grunt-jsonlint');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-bump');
    grunt.loadNpmTasks('grunt-contrib-clean');

    grunt.registerTask('check', ['jsonlint', 'jshint']);
    grunt.registerTask('test', ['check', 'jasmine']);
    grunt.registerTask('build', ['test', 'clean:build', 'copy:srcToBuild']);
    grunt.registerTask('release', ['build', 'bump']);
    grunt.registerTask('default', ['test']);
    grunt.loadNpmTasks('grunt-exec');

};