# appscript-automation
Automated data migration with Google Apps Script.

## Overview
This project contains a set of Google Apps Script utilities to automate spreadsheet data cleanup, renaming, sorting, and replacement tasks. It is intended to run in the Apps Script runtime (via the Apps Script editor or `clasp`).

## Features
- Batch rename, remove, and replace sheet data
- Sorting and ordering helpers
- Trigger helpers for scheduled runs
- Modular scripts split by purpose

## Project Structure
- [Code.js](Code.js)
- [File.js](File.js)
- [Number.js](Number.js)
- [Ord.js](Ord.js)
- [Remove.js](Remove.js)
- [Rename.js](Rename.js)
- [Replace.js](Replace.js)
- [Sort.js](Sort.js)
- [Trigger.js](Trigger.js)
- [appsscript.json](appsscript.json)

## Requirements
- Google account with access to Apps Script
- Node.js + `clasp` (optional, for local development)

## Setup (with clasp)
1. Install clasp globally: `npm i -g @google/clasp`
2. Login: `clasp login`
3. Clone the script (already done for this repo): `clasp clone <scriptId>`
4. Push changes: `clasp push`
5. Open in Apps Script editor: `clasp open`

## Usage
Open the Apps Script editor and run the entry-point functions defined in the scripts. Refer to the individual files for function names and configuration. Typical usage:
1. Configure spreadsheet IDs, sheet names, and ranges in the relevant script.
2. Run the main function (e.g., rename/remove/replace/sort entry points).
3. Set up triggers using helpers in [Trigger.js](Trigger.js).

## Notes
- This project targets the Apps Script runtime, not Node.js.
- Keep sensitive IDs or keys out of the repository.

## License
MIT
