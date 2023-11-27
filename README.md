## NodeJS--convert-JSON-to-CSV
This repo has a NodeJS code that turns a JSON into a CSV file

It uses json2csv and fs

The logic goes as follows:
1. It imports the new-format-JSON file and extracts all the fieldnames.
2. There's a predefined list of all the field names from the old-format-JSON. All the fields and its order is defined in the file 'originalFields.json' 
   (Users can edit this file to include all the compulsary fields and also decide the order)
4. then we traverse through the newFields list to delete all the repeatative fields also present in the old fields list.
5. Now it appends the unique fields with the previous format of list and generates a JSON.
6. This finalJSON is then converted to a CSV.

# Things to be updated by the user
1. Path to the new JSON - on line 70
2. Path to store the generated CSV - on line 79
