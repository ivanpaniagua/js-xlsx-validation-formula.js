# js-xlsx-validation-formula.js
Adding Validation based on Formulas to the popular Excel Library XLSX.js

This work is based on magnifi/js-xlsx-validation.js however their code dont allow Formulas.

You need to have the library Xlsx.js and modify the method write_ws_xml
function write_ws_xml(idx, opts, wb, rels) {
  // ...
  if(ws['!merges'] != null && ws['!merges'].length > 0) o[o.length] = (write_ws_xml_merges(ws['!merges']));
  if(ws['!dataValidation']) o[o.length] = write_ws_xml_datavalidation(ws['!dataValidation']);
  // ...
}

//example Sheet1 with another spreadsheet e.g. People and the values to validate in the column F
var wb = {
  Sheets: {
    Sheet1: {
      '$ref': 'A1:Z99',
      '!dataValidation': [
        {sqref: 'A1:A99', formula : 'People!F:F'},
      ]
    }
  },
  SheetNames: ['Sheet1']
}

// Very Important at the moment of export the Excel File, add the parameter ignoerEC to false. This is the last step.
XLSX.writeFile(wb, "ExportForecast.xlsx", { ignoreEC : false });
