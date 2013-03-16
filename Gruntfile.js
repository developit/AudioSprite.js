module.exports = function(grunt) {

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		concat: {
			options: {
				separator: '\n'
			},
			normal : {
				src: [
					'src/AudioSprite.js'
				],
				dest: 'dist/<%= pkg.version %>/<%= pkg.name %>.js'
			}
		},
		uglify: {
			normal : {
				options: {
					banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
				},
				files: {
					'dist/<%= pkg.version %>/<%= pkg.name %>.min.js': ['<%= concat.normal.dest %>']
				}
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-concat');

	grunt.registerTask('default', [
		'concat:normal',
		'uglify:normal'
	]);
	
};