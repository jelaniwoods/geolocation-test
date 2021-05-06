Capybara.default_max_wait_time = 5

Capybara.register_driver :selenium do |app|
  capabilities = Selenium::WebDriver::Remote::Capabilities.chrome("chromeOptions" => {"prefs" => { "profile.default_content_setting_values.geolocation" => 2 } })
  Capybara::Selenium::Driver.new(app, browser: :chrome, desired_capabilities: capabilities)
end
# if ENV['BROWSER'] == 'chrome'
# else
#   Capybara.register_driver :selenium do |app|
#     ff_profile = Selenium::WebDriver::Firefox::Profile.new.tap do |profile|
#       profile["permissions.default.geo"] = 1
#     end
#     options = Selenium::WebDriver::Firefox::Options.new(args: ['-headless'], profile: ff_profile)

#     Capybara::Selenium::Driver.new(app, browser: :firefox, options: options)
#   end
# end


Capybara.default_driver = :selenium
Capybara.run_server = true
