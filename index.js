const json2csv = require('json2csv').parse
const fs = require('fs')

// import a file
let data = JSON.parse(fs.readFileSync("./path/to/new/format/file"))

// extract field names from json
let newFields = Object.keys(data[0])

// list of old fields i.e. the fieldnames in the order that we want
const oldFields = [
  'File Name',
  'Document ID',
  'Queue ID',
  'Queue Name',
  'Model Type',
  'URL',
  'IBAN',
  'Email',
  'Total',
  'FX Rate',
  'Freight',
  'Currency',
  'Discount',
  'PO Number',
  'Subtotal',
  'Tax Total',
  'Other Date',
  'Signature',
  'Swift Code',
  'Vendor Fax Number',
  'Form Number',
  'Tax Percent',
  'Total Check',
  'Account Name',
  'Vendor Name',
  'Invoice Date',
  'Payment Date',
  'Payment Term',
  'Project Name',
  'RubberStamp',
  'Unique Stamp',
  'Vendor Phone Number',
  'Customer Name',
  'Invoice Type',
  'Serial Number',
  'Account Number',
  'Invoice Number',
  'Line Rows Check',
  'Vendor Address',
  'Subtotal Check',
  'Total Rounding',
  'Billing Address',
  'Govt. Verification',
  'ISOCountryCode',
  'Less Amount Paid',
  'Description Text',
  'Discount Percent',
  'Bank Name',
  'Shipping Address',
  'Vendor GST Number',
  'Vendor Name Check',
  'Sales Order Number',
  'Customer GST Number',
  'Exchange Currency To',
  'Delivery Order Number',
  'Exchange Currency From',
  'Registered Vendor Name',
  'Registered Vendor Status',
  'Comments',
  'Items'
]

// traverse through each field and append to field list if field not present in the old format
var fields = []

fields.push(...oldFields);

for(let i=0;i<oldFields.length;i++){
    for(let j=0;j<newFields.length;j++){
        if(oldFields[i] === newFields[j]){
            let deleted = newFields.splice(j, 1);
            break;
        }
    }
}

fields.push(...newFields);

let finalJSON = [];
for(var a in data){
    finalJSON.push({});
    for(var i in fields){
        finalJSON[a][fields[i]] = data[a][fields[i]];
    }
}

//convert JSON to csv
const csv = json2csv(finalJSON,fields)

// generates a csv file
fs.writeFileSync('./path/to/data.csv',csv,(err) => {
    if (err) throw err
    console.log("CSV file is not saved")
} )
