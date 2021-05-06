Feature: Get client location

Scenario: I get the user location
  Given I am on the 'home' page
  When I click on "location"
  Then I should see the text, "latitude"
