function countMainImagesOnly() {
  const rootFolderId = '1NxRiidieljyHOc5QpGSnAdspPzbhJT_a';
  const rootFolder = DriveApp.getFolderById(rootFolderId);
  
  // Navigate to the Organized Content folder
  const masterIter = rootFolder.getFoldersByName("--- ORGANIZED CONTENT ---");
  if (!masterIter.hasNext()) return console.error("Organized folder not found.");
  
  const master = masterIter.next();
  const imageFolderIter = master.getFoldersByName("2. Images");
  if (!imageFolderIter.hasNext()) return console.error("Images folder not found.");

  const imageFolder = imageFolderIter.next();
  let fileCount = 0;

  // Get only files in this specific folder (does not look inside subfolders)
  const files = imageFolder.getFiles();
  while (files.hasNext()) {
    files.next();
    fileCount++;
  }

  console.log("--- MAIN IMAGES FOLDER COUNT ---");
  console.log("Files in '2. Images' (excluding subfolders): " + fileCount);
}