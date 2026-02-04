function renameMainImagesOnly() {
  const rootFolderId = '1NxRiidieljyHOc5QpGSnAdspPzbhJT_a';
  const rootFolder = DriveApp.getFolderById(rootFolderId);
  const master = rootFolder.getFoldersByName("--- ORGANIZED CONTENT ---").next();
  const imageFolder = master.getFoldersByName("2. Images").next();
  
  const startTime = new Date().getTime();
  const files = imageFolder.getFiles();
  
  let unnumberedFiles = [];
  let highestExistingNumber = 0;

  // 1. Scan the folder for existing progress
  while (files.hasNext()) {
    const file = files.next();
    const name = file.getName();
    const match = name.match(/^(\d{3,4})_/);

    if (match) {
      // It's already numbered, track the highest number
      let num = parseInt(match[1]);
      if (num > highestExistingNumber) highestExistingNumber = num;
    } else {
      // It's NOT numbered, add to our list to be sorted
      unnumberedFiles.push({
        file: file,
        size: file.getSize(),
        name: name
      });
    }
  }

  // If everything is already numbered, stop here
  if (unnumberedFiles.length === 0) {
    console.log("All files in this folder are already numbered.");
    return;
  }

  // 2. Sort the UNNUMBERED files by size (Largest to Smallest)
  unnumberedFiles.sort((a, b) => b.size - a.size);

  // 3. Rename them starting from (highest + 1)
  for (let i = 0; i < unnumberedFiles.length; i++) {
    // 5-minute safety check for Google's timeout
    if (new Date().getTime() - startTime > 300000) {
      console.warn("Approaching timeout. Run again to continue from #" + (highestExistingNumber + i));
      return;
    }

    let item = unnumberedFiles[i];
    let nextNum = highestExistingNumber + i + 1;
    let prefix = nextNum.toString().padStart(3, '0'); 
    
    try {
      item.file.setName(prefix + "_" + item.name);
    } catch (e) {
      console.error("Error renaming " + item.name + ": " + e.message);
    }
  }
  
  console.log("Batch complete. Next available number will be: " + (highestExistingNumber + unnumberedFiles.length + 1));
}