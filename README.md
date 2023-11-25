## NodeJS--convert-JSON-to-CSV
This repo has a NodeJS code that turns a JSON into a CSV file

It uses json2csv and fs

The logic goes as follows:
1. It imports the new-format-JSON file and extracts all the fieldnames.
2. There's a predefined list of all the field names from the old-format-JSON.
   (Users can edit this fields to include all the compulsary fields and also decide the order. the variable name is oldFields)
3. then we traverse through the newFields list to delete all the repeatative fields also present in the old fields list.
4. Now it appends the unique fields with the previous format of list and generates a JSON.
5. This finalJSON is then converted to a CSV.

# Things to be updated by the user
1. Path to the new JSON - on line 5
2. Path to store the generated CSV - on line 102
