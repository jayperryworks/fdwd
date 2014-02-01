# A sample Guardfile
# More info at https://github.com/guard/guard#readme

notification :off

guard :bundler do
  watch('Gemfile')
  # Uncomment next line if your Gemfile contains the `gemspec' command.
  # watch(/^.+\.gemspec/)
end

# Guard::Compass
#
# You don't need to configure watchers for guard 'compass' declaration as they generated
# from your Compass configuration file. You might need to define the Compass working directory
# and point to the configuration file depending of your project structure.
#
# Available options:
#
# * working_directory: Define the Compass working directory, relative to the Guardfile directory
# * configuration_file: Path to the Compass configuration file, relative to :project_path
#
# Like usual, the Compass configuration path are relative to the :project_path

# guard 'compass', project_path: 'not_current_dir', configuration_file: 'path/to/my/compass_config.rb'
guard :compass, compile_on_start: true

# This will concatenate the javascript files specified in :files to public/js/all.js
guard :concat, type: "js", files: %w(plugins/console plugins/transit plugins/enquire plugins/typography app), input_dir: "_preprocess/js", output: "assets/js/app"

# guard "jekyll-plus", :serve => true do
#   watch /.*/
#   ignore /^_site/
# end

guard 'livereload' do
  watch(%r{.+\.(css|js|html)})
end

# guard 'uglify', :destination_file => "assets/js/app.js" do
#   watch (%r{assets/js/app.js})
# end
