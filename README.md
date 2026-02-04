# appscript-automation
Open-source Google Apps Script utilities for repeatable data migration and file organization.

## Why this repo
This project is intended as an open, reusable toolkit for automating common Google Drive + Spreadsheet workflows. It favors small, well-scoped scripts that can be copied, adapted, and improved by the community.

## What it does
- Batch rename, remove, and replace file names
- Sort and order files by size
- Generate folders and move files by type or location
- Track progress via Sheets and long-run batching
- Schedule jobs with triggers

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

## Getting started
### Requirements
- Google account with Apps Script access
- Node.js + `clasp` (optional, for local development)

### Setup (with clasp)
1. Install clasp globally: `npm i -g @google/clasp`
2. Login: `clasp login`
3. Clone the script (already done for this repo): `clasp clone <scriptId>`
4. Push changes: `clasp push`
5. Open in Apps Script editor: `clasp open`

## Usage
1. Configure IDs, sheet names, and ranges in the relevant script.
2. Run the main function(s) from the Apps Script editor.
3. For long jobs, run repeatedly or use trigger helpers in [Trigger.js](Trigger.js).

## Contributing
Contributions are welcome.
- Open an issue for bugs or ideas.
- Use small, focused pull requests.
- Keep scripts modular and documented.
- Avoid committing secrets or personal IDs.

## Security
Do not commit credentials, private IDs, or tokens. Use script properties or environment variables when possible.

## License
MIT
