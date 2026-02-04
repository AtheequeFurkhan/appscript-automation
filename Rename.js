function catalogCurrentFiles() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName("Image_Sort_Master") || ss.insertSheet("Image_Sort_Master");
  
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(["File ID", "Current Name", "Size (Bytes)", "New Name (Pending)"]);
  }

  const folderId = '1JeyQBEXvQaSLCU59-AuSGHevemuLLNoP';
  const folder = DriveApp.getFolderById(folderId);
  const props = PropertiesService.getScriptProperties();
  const token = props.getProperty('CATALOG_TOKEN');
  
  let files = token ? DriveApp.continueFileIterator(token) : folder.getFiles();
  let data = [];
  const startTime = new Date().getTime();

  while (files.hasNext()) {
    // Stop at 5 minutes to save progress
    if (new Date().getTime() - startTime > 300000) {
      props.setProperty('CATALOG_TOKEN', files.getContinuationToken());
      if (data.length > 0) sheet.getRange(sheet.getLastRow() + 1, 1, data.length, 3).setValues(data);
      console.log("Batch saved. Run again to continue...");
      return;
    }

    let f = files.next();
    let rawName = f.getName().replace(/^\d+_/, ""); // We "clean" the name in the sheet only
    data.push([f.getId(), rawName, f.getSize()]);
  }
  
  if (data.length > 0) sheet.getRange(sheet.getLastRow() + 1, 1, data.length, 3).setValues(data);
  props.deleteProperty('CATALOG_TOKEN');
  console.log("Cataloging Complete!");
}