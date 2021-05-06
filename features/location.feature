Feature: Get client location

Background: I am on the 'home' page
  Given I am on the 'home' page

Scenario: I get the user location
  When I click on "location"
  Then I should see the text, "latitude"
