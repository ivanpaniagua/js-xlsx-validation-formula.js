function write_ws_xml_datavalidation(validations) {
    if (validations[0].formula) {
        return write_ws_xml_datavalidationFormula(validations);
    }

    var o = '<dataValidations>';
    for (var i = 0; i < validations.length; i++) {
        var validation = validations[i];
        o += '<dataValidation type="list" allowBlank="1" sqref="' + validation.sqref + '">';
        o += '<formula1>&quot;' + validation.values + '&quot;</formula1>';
        o += '</dataValidation>';
    }
    o += '</dataValidations>';
    return o;
}

function write_ws_xml_datavalidationFormula(validations) {
    var o = '<extLst><ext uri="{CCE6A557-97BC-4b89-ADB6-D9C93CAAB3DF}" xmlns:x14="http://schemas.microsoft.com/office/spreadsheetml/2009/9/main">';
    o += '<x14:dataValidations count="1" xmlns:xm="http://schemas.microsoft.com/office/excel/2006/main">';
    for (var i = 0; i < validations.length; i++) {
        var validation = validations[i];
        o += '<x14:dataValidation type="list" allowBlank="1" showInputMessage="1" showErrorMessage="1">';
        o += '<x14:formula1><xm:f>' + validation.formula + '</xm:f></x14:formula1>';
        o += '<xm:sqref>' + validation.sqref + '</xm:sqref>';
        o += '</x14:dataValidation>';
    }
    o += '</x14:dataValidations></ext></extLst>';
    return o;
}

//You need to have the library Xlsx.js and modify the method write_ws_xml
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

// Important! at the moment of export the Excel File, add the parameter ignoerEC to false. This is the last step.
XLSX.writeFile(wb, "ExportForecast.xlsx", { ignoreEC : false });
