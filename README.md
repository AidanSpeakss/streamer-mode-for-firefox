# Streamer Mode for Firefox
Hides personal information from pages, similar to Discord's Streamer mode.

# Installing:
Add to Firefox: https://addons.mozilla.org/en-US/firefox/addon/streamermode/  

Add to Chrome:
1. Download the .zip file from /chromesrc in this repository.
2. Extract the files into their own folder.
2. Go to chrome://extensions/
3. Enable "Developer Mode"
4. Select "Load unpacked" and select the folder where the files you just extracted are.

*Note: Make sure your select the folder containing the extension files (i.e. manifest.json, background.js) not a folder containing that folder.*

## Features:
- Ensures pages do not display your personal information, EVEN while and before loading.
- Prevents changes to the pages from showing your personal information.
- Ability to specifiy any string as personal information.
- Warns users if a page is not fully supported by the extension, to prevent them from accidently leaking their information.

## Known Issues:
- Must be manaully updated when new unsupported sites are reported.  
- Tab title is still visible during load, leaking personal information contained in the title.

## Upcoming Updates:
- Find and implement workaround to hide tab title during load.
- External site for unsupported URL's and module to check site every 24 hours for new unsupported URL's and store them in browser storage
- Button to toggle tool on/off
- Option to add sites to a whitelist
- Option to specify a word to replace personal information with (Ex: Redacted)
- Experimental feature to hide the window from capture software (being worked on by: https://github.com/ConniBug)  
- Integration with experimental feature to call the window hider while unsupported sites are open.





# Changelog:

**(NEW) v1.6.2:**
- Minor performance improvements
- More code cleanup

**v1.6.1:**
- Added Facebook back to supported pages
- Added Google docs to unsupported sites
- Minor code cleanup/improvements

**v1.6:**
- Fix for "Doesn't modify text in certain circumstances"
- Fixed issue with leading/trailing whitespaces being considered part of user inputted personal information
  - Leading/trailing white spaces are now removed when hit submit on the options page (Ex. " First Last " becomes "First last")
  - Intentional whitespace such as between two words (ex. "First last") is preserved with this new whitespace cleansing feature
- Options page is now accessible by clicking on the icon in your toolbar
- Small fixes/improvements
  - Clicking submit now updates the #managed-pii area in the options page.

**v1.5:**
- Released on the addon store
- Fix to breaking links
- Name/Logo Change
- Removed console.logs from code
