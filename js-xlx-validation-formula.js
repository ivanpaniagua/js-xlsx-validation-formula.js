function write_ws_xml_datavalidation(validations) {
    var o = ''
    for (var i = 0; i < validations.length; i++) {
	var validation = validations[i];
        if (validation.type === "list") {
		o += write_ws_xml_datavalidationFormulaRange(validation);
	} else {
		o += write_ws_xml_datavalidationFormula(validation);
	}
    }
    console.log(o);
    return o;
}
// new function added to validate Range in another Spreadsheet.
function write_ws_xml_datavalidationFormulaRange(validation) {
    var o = '<extLst><ext uri="{CCE6A557-97BC-4b89-ADB6-D9C93CAAB3DF}" xmlns:x14="http://schemas.microsoft.com/office/spreadsheetml/2009/9/main">';
		o += '<x14:dataValidations count="1" xmlns:xm="http://schemas.microsoft.com/office/excel/2006/main">';
        o += '<x14:dataValidation type="list" allowBlank="1" showInputMessage="1" showErrorMessage="1">';
        o += '<x14:formula1><xm:f>' + validation.formula + '</xm:f></x14:formula1>';
        o += '<xm:sqref>' + validation.sqref + '</xm:sqref>';
        o += '</x14:dataValidation>';
		o += '</x14:dataValidations></ext></extLst>';
    return o;
}
// new function added to validate formulas.
function write_ws_xml_datavalidationFormula(validation) {
	var o = '<dataValidations count="1">';
		o += '<dataValidation type="' + validation.type + '" allowBlank="1" showInputMessage="1" showErrorMessage="1" sqref="' + validation.sqref + '" >';
		o += '<formula1>' + validation.formula + '</formula1>';
		o += '</dataValidation>';
		o += '</dataValidations>';
    return o;
}
//You need to have the library Xlsx.js and modify the method write_ws_xml
function write_ws_xml(idx, opts, wb, rels) {
  // ...
  if(ws['!merges'] != null && ws['!merges'].length > 0) o[o.length] = (write_ws_xml_merges(ws['!merges']));
  if(ws['!dataValidation']) o[o.length] = write_ws_xml_datavalidation(ws['!dataValidation']);
  // ...
}
//*****************************************EXAMPLE***************************************
//example Sheet1 with another spreadsheet e.g. People and the values to validate in the column F
var wb = {
  Sheets: {
    Sheet1: {
      '$ref': 'A1:Z99',
      '!dataValidation': [
        { sqref: 'B2:D2', formula : 'ISNUMBER(B2)', type: 'custom' }, // this should be the first before any list and the ref inside the ISNUMBER could be B1 OR CX
        { sqref: 'A1:A99', formula : 'People!F:F', type: 'list' }
      ]
    }
  },
  SheetNames: ['Sheet1']
}
// Important! at the moment of export the Excel File, add the parameter ignoerEC to false. This is the last step.
XLSX.writeFile(wb, "ExportForecast.xlsx", { ignoreEC : false });
