Level 1
Load Prediction Data
[] - Refactor the IsPidgeon component to accept an image url. The image URL should automatically fill the <img> tag's src property and the image should appear on the page when a URL is entered.
[] - Add functionality to the IsPidgeon component that will tell the user whether a given image is or is not a pidgeon using the output from the isPidgeonTest function that is provided.
[] - Create a list in the BirdList component that dynamically renders images that have been tested. (Use the data from sampleData.js for now).
[] - Allow users to switch between the two views using the Show me my Birds and Is this a Pidgeon? buttons in the navbar:
[] - Pidgeon Tester displays the IsPidgeon component and allows users to get a prediction on whether an image is a pidgeon or not.
[] - Show me my Birds displays the BirdList component and displays a list of tested images.
Level 2
Save and Load Image Predictions to a Mongo Database
[] - Implement a POST route that allows users to save prediction test results to a Mongo database.
[] - Implement a GET route that allows users to load prediction test results from a Mongo database.
[] - Refactor the BirdList component so that it shows prediction test results that are loaded from the database.
[] - There should be no duplicate URLs in the database.
Level 3
Edit Image Predictions
[] - Implement a PATCH route that allows users to edit a prediction test entry.
[] - Allow users to click on an entry in BirdList and update information about that entry (Name, isPidgeonStatus)
[] - Implement a DELETE route that allows users to delete a prediction test result.
Level 4
Sort Prediction Tests
[] - Refactor your Mongoose schema to save the percentage confidence provided by the isPidgeonTest function and a liked status.
[] - Implement a second PATCH route that allows users to like a specific prediction test entry.
[] - Add a I love this bird button to prediction test entries that will set liked to true. Users should not be able to like prediction tests that are not pidgeons.
[] - Implement a sort on your BirdList that will display prediction tests that have a higher pidgeon confidence higher in the list.
[] - Implement a sort on your BirdList that will display prediction tests that are liked top of the list, regardless of pidgeon confidence.
[] - Implement a PercentagePidgeon component that will display on the BirdList the percentage of prediction tests that are pidgeons. This percentage should automatically update when new tests are performed or a test is edited.
Level 5
Categorize Non-Pidgeon Tests
[] - Using the information provided by the predictions object in the isPidgeonTest function (Will require a refactor of the .then block to get this information), save the prediction categorization of non-pidgeon images.
[] - Create a drop down menu in BirdList that contains all existing categoriztions in the database. Allow users to view image prediction tests that only match the selected category. Tests should still be sorted by confidence interval, but only pidgeons can be liked.