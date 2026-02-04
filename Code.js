function mapFolderStructure() {
  const rootFolderId = '1NxRiidieljyHOc5QpGSnAdspPzbhJT_a';
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName("Folder_Queue");
  if (sheet) ss.deleteSheet(sheet);
  sheet = ss.insertSheet("Folder_Queue");
  sheet.appendRow(["Folder ID", "Folder Name", "Status"]);

  const root = DriveApp.getFolderById(rootFolderId);
  listFoldersRecursive(root, sheet);
}

function listFoldersRecursive(folder, sheet) {
  const subs = folder.getFolders();
  while (subs.hasNext()) {
    const sub = subs.next();
    // Don't add the organized folder to the list
    if (sub.getName() !== "--- ORGANIZED CONTENT ---") {
      sheet.appendRow([sub.getId(), sub.getName(), "Pending"]);
      listFoldersRecursive(sub, sheet);
    }
  }
}