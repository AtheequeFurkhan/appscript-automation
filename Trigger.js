function applyNamesFromSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName("Image_Sort_Master");
  const data = sheet.getDataRange().getValues();
  const startTime = new Date().getTime();

  // 1. Find the first row that isn't "Done" or "Error"
  let startIndex = -1;
  for (let i = 1; i < data.length; i++) {
    let status = data[i][4]; // Column E
    if (status !== "Done" && status !== "Error") { 
      startIndex = i;
      break;
    }
  }

  // 2. Stop if we are finished
  if (startIndex === -1) {
    console.log("All files processed!");
    return;
  }

  console.log("Resuming from Row: " + (startIndex + 1));

  // 3. Process with the 4m 50s limit (290,000 milliseconds)
  for (let i = startIndex; i < data.length; i++) {
    
    if (new Date().getTime() - startTime > 290000) {
      console.warn("4:50 reached. Saving progress for the next trigger.");
      return;
    }

    let fileId = data[i][0];
    let cleanName = data[i][1];
    let newPrefix = (i + 1).toString().padStart(4, '0'); 
    
    try {
      DriveApp.getFileById(fileId).setName(newPrefix + "_" + cleanName);
      sheet.getRange(i + 1, 5).setValue("Done");
    } catch (e) {
      console.warn("Row " + (i + 1) + " failed: " + e.message);
      sheet.getRange(i + 1, 5).setValue("Error");
    }
  }
}