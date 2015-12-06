var path = require('path');

module.exports = function(grunt) {
    var webpack = require("webpack");
    var webpackConfig = require('./webpack.config.js');

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('./package.json'),
        clean: {
            prebuild: {
                src: ['./www/**/*']
            }
        },
        copy: {
            build: {
                files: [
                    {
                        expand: true,
                        cwd: './src/themes',
                        src: ['./**/assets/**'],
                        dest: './www/themes'
                    },
                    {
                        src: './src/index.html',
                        dest: './www/index.html'
                    }
                ]
            },
            config: {
                src: './src/modules/config/registration-info.json.template',
                dest: './src/modules/config/registration-info.json',
                // Copy if file does not exist.
                filter: function (aFilePath) {
                    var dest = grunt.config('copy.config.dest');
                    var exists = grunt.file.exists(path.resolve(dest));

                    if (exists) {
                        grunt.log.writeln('Config file "'['green'] + dest + '" already exists.'['green']);
                    } else {
                        grunt.log.writeln('Config file "'['green'] + dest + '" has been created.'['green']);
                    }

                    grunt.log.writeln('Enter your app credentials into the file before build.'['green']);

                    return !exists;
                }
            }
        },
        webpack: {
            options: webpackConfig,
            build: {
				plugins: webpackConfig.plugins.concat(
					new webpack.DefinePlugin({
						'process.env': {
							// This has effect on the react lib size
							'NODE_ENV': JSON.stringify('production')
						}
					}),
					new webpack.optimize.UglifyJsPlugin()
				)
			},
			'build-dev': {
				devtool: 'sourcemap',
				debug: true
			}
        },
        less: {
            build: {
                options: {
                    paths: ["./src"],
                    plugins: [
                        new (require('less-plugin-autoprefix'))({browsers: ["last 2 versions"]}),
                        new (require('less-plugin-clean-css'))()
                    ],
                    modifyVars: {
//                        themesPath: '"themes"'
                    }
                },
                files: [
                    {
                        expand: true,
                        cwd: './src/themes',
                        src: ['./*.less'],
                        dest: './www/themes',
                        ext: '.css'
                    }
                ]
            },
            'build-dev': {
                options: {
                    paths: ["./src"],
                    sourceMap: true
                },
                files: [
                    {
                        expand: true,
                        cwd: './src/themes',
                        src: ['./*.less'],
                        dest: './www/themes',
                        ext: '.css'
                    }
                ]
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-webpack');

    grunt.registerTask('build', ['clean:prebuild', 'webpack:build', 'less:build', 'copy:build']);
    grunt.registerTask('build-dev', ['clean:prebuild', 'webpack:build-dev', 'less:build-dev', 'copy:build']);
    grunt.registerTask('config', ['copy:config']);
};
