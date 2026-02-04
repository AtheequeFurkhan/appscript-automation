function processQueue() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName("Folder_Queue");
  if (!sheet) return console.error("Run mapFolderStructure first!");

  const data = sheet.getDataRange().getValues();
  const rootFolderId = '1NxRiidieljyHOc5QpGSnAdspPzbhJT_a';
  const rootFolder = DriveApp.getFolderById(rootFolderId);
  
  // 1. Setup Master & Base Category Folders
  const master = getOrCreate(rootFolder, "--- ORGANIZED CONTENT ---");
  const baseTargets = {
    "Videos": getOrCreate(master, "1. Videos"),
    "Images": getOrCreate(master, "2. Images"),
    "PDFs":   getOrCreate(master, "3. PDFs"),
    "Other":  getOrCreate(master, "4. Other Files")
  };

  // 2. Setup Country Subfolders inside Images and Videos
  const locationTargets = {
    "UK": {
      "Images": getOrCreate(baseTargets["Images"], "UK"),
      "Videos": getOrCreate(baseTargets["Videos"], "UK")
    },
    "Thailand": {
      "Images": getOrCreate(baseTargets["Images"], "Thailand"),
      "Videos": getOrCreate(baseTargets["Videos"], "Thailand")
    }
  };

  let processedThisTurn = 0;
  const BATCH_SIZE = 100; 

  for (let i = 1; i < data.length; i++) {
    if (data[i][2] === "Pending") {
      const folderId = data[i][0];
      const folderName = data[i][1]; // Use the name from the spreadsheet
      
      try {
        const folder = DriveApp.getFolderById(folderId);
        
        // Determine Location based on folder name
        let location = null;
        if (/uk|united kingdom|london|england/i.test(folderName)) location = "UK";
        else if (/thailand|thai|bangkok|phuket/i.test(folderName)) location = "Thailand";

        moveFilesFromFolder(folder, baseTargets, locationTargets, location);
        sheet.getRange(i + 1, 3).setValue("Done");
      } catch (e) {
        sheet.getRange(i + 1, 3).setValue("Error/Deleted: " + e.message);
      }
      
      processedThisTurn++;
      if (processedThisTurn >= BATCH_SIZE) break; 
    }
  }
}

function moveFilesFromFolder(folder, baseTargets, locTargets, location) {
  const files = folder.getFiles();
  while (files.hasNext()) {
    const file = files.next();
    const name = file.getName().toLowerCase();
    let target;

    // Classification Logic
    if (/(mp4|mkv|mov|qt|avi|wmv|flv|webm|m4v)$/.test(name)) {
      target = (location && locTargets[location]) ? locTargets[location]["Videos"] : baseTargets["Videos"];
    } 
    else if (/(jpg|jpeg|png|heic|heif|webp|tiff|dng|cr2|arw)$/.test(name)) {
      target = (location && locTargets[location]) ? locTargets[location]["Images"] : baseTargets["Images"];
    } 
    else if (name.endsWith(".pdf")) {
      target = baseTargets["PDFs"];
    } 
    else {
      target = baseTargets["Other"];
    }

    try {
      file.moveTo(target);
    } catch (e) {
      console.warn("Could not move " + name);
    }
  }
}

function getOrCreate(parent, name) {
  const folders = parent.getFoldersByName(name);
  return folders.hasNext() ? folders.next() : parent.createFolder(name);
}