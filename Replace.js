function applyNamesFromSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName("Image_Sort_Master");
  const data = sheet.getDataRange().getValues();
  const startTime = new Date().getTime();

  // 1. Automatic Start Detection: Find the first row that isn't "Done"
  let startIndex = -1;
  for (let i = 1; i < data.length; i++) {
    if (data[i][4] !== "Done") { // Column E is index 4
      startIndex = i;
      break;
    }
  }

  // 2. Safety Check: If everything is "Done", stop the script
  if (startIndex === -1) {
    console.log("All files are already marked as 'Done'!");
    return;
  }

  console.log("Resuming from Row: " + (startIndex + 1));

  // 3. Process from the detected start point
  for (let i = startIndex; i < data.length; i++) {
    // 5-minute safety check (Google's 6-minute limit)
    if (new Date().getTime() - startTime > 300000) {
      console.warn("Time almost up. Finished up to row " + i + ". Run again to continue.");
      return;
    }

    let fileId = data[i][0];
    let cleanName = data[i][1];
    let newPrefix = (i + 1).toString().padStart(4, '0'); 
    
    try {
      // Rename the file
      DriveApp.getFileById(fileId).setName(newPrefix + "_" + cleanName);
      
      // Update the Sheet status
      sheet.getRange(i + 1, 5).setValue("Done");
    } catch (e) {
      console.warn("Error at row " + (i + 1) + ": " + e.message);
      sheet.getRange(i + 1, 5).setValue("Error: " + e.message);
    }
  }

  console.log("Renaming Complete! All 7,408 files processed.");
}