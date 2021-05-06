Capybara.default_max_wait_time = 5

# Capybara.register_driver :selenium do |app|
#   capabilities = Selenium::WebDriver::Remote::Capabilities.chrome("chromeOptions" => {"prefs" => { "profile.default_content_setting_values.geolocation" => 1 } })
#   Capybara::Selenium::Driver.new(app, browser: :chrome, desired_capabilities: capabilities)
# end
# 
# Capybara.default_driver = :selenium
# Capybara.run_server = true
