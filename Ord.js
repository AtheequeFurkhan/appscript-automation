function checkSortingProgress() {
  const rootFolderId = '1NxRiidieljyHOc5QpGSnAdspPzbhJT_a';
  const rootFolder = DriveApp.getFolderById(rootFolderId);
  const master = rootFolder.getFoldersByName("--- ORGANIZED CONTENT ---").next();
  const imageFolder = master.getFoldersByName("2. Images").next();
  
  const files = imageFolder.getFiles();
  let sorted = 0;
  let unsorted = 0;

  while (files.hasNext()) {
    const name = files.next().getName();
    if (/^\d{3,4}_/.test(name)) {
      sorted++;
    } else {
      unsorted++;
    }
  }

  console.log("--- SORTING PROGRESS ---");
  console.log("Files already Sorted (Numbered): " + sorted);
  console.log("Files still Unsorted: " + unsorted);
  console.log("Completion: " + ((sorted / (sorted + unsorted)) * 100).toFixed(2) + "%");
}