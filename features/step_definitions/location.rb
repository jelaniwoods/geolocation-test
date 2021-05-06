Given(/^I am on the 'home' page$/) do
  visit root_path
end

When('I click on {string}') do |string|
  click_on(string)
end

Then(/^I should see the text, "(.*?)"$/) do |expected_text|
  expect(page).to have_text(/#{expected_text}/i)
end

