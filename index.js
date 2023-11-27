const json2csv = require('json2csv').parse
const fs = require('fs')

function import_file(path){
    let new_file = JSON.parse(fs.readFileSync(path))
    return new_file
}

function get_fields_json(model_name){
    let json_file = import_file("originalFields.json")
    let fields_list = json_file[0][model_name]
    return fields_list
}

function get_field_list(file_name){
    let new_fields_list = Object.keys(file_name[0])
    return new_fields_list
}

function generate_final_JSON(new_file, field_list){
    let finalJSON = [];

    //for each document in the input json
    for(var a in new_file){
        finalJSON.push({});

        // for each field in the document
        for(var i in field_list){
            if (new_file[a][field_list[i]]){
                finalJSON[a][field_list[i]] = new_file[a][field_list[i]];
            } else {
                finalJSON[a][field_list[i]] = "";
            }
        }
    }
    return finalJSON
}

function generate_csv(json_obj, field_list){
    const csv = json2csv(json_obj, field_list);
    return csv
}

function model_temp(model_name , file_name){
    var new_fields_list = get_field_list(file_name)
    var old_field_list = get_fields_json(model_name)
    var fields = []

    fields.push(...old_field_list);

    for(let i=0;i<old_field_list.length;i++){
        for(let j=0;j<new_fields_list.length;j++){
            if(old_field_list[i] === new_fields_list[j]){
                let deleted = new_fields_list.splice(j, 1);
                break;
            }
        }
    }
    fields.push(...new_fields_list);
    
    // Now the 'fields' variable contains the fields in the desired order
    var final_JSON = generate_final_JSON (file_name , fields)

    var csv = generate_csv(final_JSON,fields)

    return csv
}

// Import the new file
var new_file = import_file("/path/to/newJSON.json")

// Get the Model type from the new file
let modelType = new_file[0]["Model Type"]

//generate a JSON with all the old fields + new fields
var new_CSV = model_temp(modelType , new_file)

// writing the JSON string content to a file
fs.writeFile("/path/to/generated/data.csv", new_CSV, (error) => {
  // throwing the error
  // in case of a writing problem
  if (error) {
    // logging the error
    console.error(error);

    throw error;
  }
  console.log("data.csv generated");
});