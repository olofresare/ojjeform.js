module.exports = function(grunt) {
	const sass = require('node-sass');
 
	require('load-grunt-tasks')(grunt);
 
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		watch: {
			sass: {
				files: 'scss/*.scss',
				tasks: ['sass', 'regex-replace']
			},
		},
		sass: {
			options: {
				implementation: sass,
				sourceMap: false
			},
			dist: {
				files: {
					'css/ojjeform.css': 'scss/ojjeform.scss'
				}
			}
		},
		"regex-replace": {
			foofoo: {
				src: ['css/ojjeform.css'],
				actions: [{
						name: 'bar',
						search: '}',
						replace: '\n}',
						flags: 'g'
					}
				]
			}
		}
	});
 
	grunt.registerTask('default', ['watch']);
};