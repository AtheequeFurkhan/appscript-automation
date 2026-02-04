function clearAllPrefixesHighVolume() {
  const folderId = '1JeyQBEXvQaSLCU59-AuSGHevemuLLNoP';
  const folder = DriveApp.getFolderById(folderId);
  const properties = PropertiesService.getScriptProperties();
  const continuationToken = properties.getProperty('CLEAN_TOKEN');
  
  let files = continuationToken ? DriveApp.continueFileIterator(continuationToken) : folder.getFiles();
  const startTime = new Date().getTime();

  try {
    while (files.hasNext()) {
      // Safety: Stop at 5 minutes to avoid timeout
      if (new Date().getTime() - startTime > 300000) {
        properties.setProperty('CLEAN_TOKEN', files.getContinuationToken());
        console.log("Time up. Progress saved. Run again or wait for trigger.");
        return;
      }

      let file = files.next();
      let name = file.getName();
      let newName = name.replace(/^\d+_/, "");
      
      if (name !== newName) {
        file.setName(newName);
      }
    }
    properties.deleteProperty('CLEAN_TOKEN');
    console.log("CLEANUP COMPLETE: All 7,408 files processed.");
  } catch (e) {
    console.error("Error: " + e.toString());
  }
}