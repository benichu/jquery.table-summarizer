/*global module:false*/
module.exports = function(grunt) {
    // Project configuration.
    grunt.initConfig({
        pkg : '<json:package.json>',
        meta: {
            banner: '/*\n' +
                ' *\tTitle:\t\t<%= pkg.name %> (<%= pkg.title %>)\n' +
                ' *\tHomepage:\t<%= pkg.homepage %>\n' +
                ' *\tBuild:\t\t<%= pkg.version %>-<%= grunt.template.today("yyyyddmm") %>\n' +
                ' *\tCopyright:\t(c)<%= grunt.template.today("yyyy") %>: <%= pkg.author.name %> <<%= pkg.author.email %>>\n' +
                ' *\tLicense:\t<%= _.pluck(pkg.licenses, "type").join(", ") %>, <%= _.pluck(pkg.licenses, "url").join(", ") %>\n' +
                ' *\n' +
                ' */'
        },
        coffee : {
            helpers : {
                src  : 'spec/coffeescripts/helpers/*.coffee',
                dest : 'spec/javascripts/helpers'
            },
            specs : {
                src  : 'spec/coffeescripts/*.coffee',
                dest : 'spec/javascripts'
            },
            plugin : {
                src  : 'js/*.coffee',
                dest : 'js'
            }
        },
        jasmine : {
            src     : ['js/libs/**/*.js', 'js/*[^(min)].js', 'spec/javascripts/libs/**/*.js'],
            helpers : 'spec/javascripts/helpers/**/*.js',
            specs   : 'spec/javascripts/**/*.js'
        },
        watch : {
            files: ['<config:coffee.helpers.src>', '<config:coffee.specs.src>', '<config:coffee.plugin.src>'],
            tasks: 'coffee jasmine'
        },
        min : {
            dist : {
                src  : ['<banner:meta.banner>', 'js/<%= pkg.name %>.js'],
                dest : 'js/<%= pkg.name %>.min.js'
            }
        }
    });

    // Lib tasks.
    grunt.loadNpmTasks('grunt-jasmine-runner');
    grunt.loadNpmTasks('grunt-coffee');

    // Default task.
    grunt.registerTask('default', 'coffee jasmine');

    // Travis CI task.
    grunt.registerTask('travis', 'coffee jasmine');
};
