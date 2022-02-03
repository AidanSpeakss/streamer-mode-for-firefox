# Streamer Mode for Firefox
Hides personal information from pages, similar to Discord's Streamer mode.

# Explanation:
When people are sharing their screen on Discord, Zoom, or even on sites like Twitch.tv. They often use their browser to react to videos, present information, play a game, etc. And if they visit a page that displays their fullname, email, or some other type of personal information, that information is visible to the stream and there is nothing they can do to stop it. That information can then be used to spam, dox, and harrass a streamer or a user of these platforms. Platforms like Discord have a built in 'Streamer Mode' that hides personal information on Discord. But these modes don't protect users when they are streaming their browser. Other sites or platforms could still display personal information and up until recently there was no tool to protect users. This extension is the tool that solves these problems. With it, you can prevent your information from getting in the hands of people that shouldn't have ever had it; by preemptively removing that information from pages, before those pages are even visible.

# Donate:
**XMR:** 43nkfFVcUFXNDYbZAHeqDt8Apjopj6nYp13VZT2z5XnJ5hU9Y1UQDR6fi9BbPnRV4ZU45npsfNXdjFtEYK17jS72NRGyYLp  
**Buy Me A Coffee:** https://www.buymeacoffee.com/devaidan


# Installing:
Add to Firefox: https://addons.mozilla.org/en-US/firefox/addon/streamermode/  

Add to Chrome:
1. Download the .zip file from /chromesrc in this repository.
2. Extract the files into their own folder.
2. Go to chrome://extensions/
3. Enable "Developer Mode"
4. Select "Load unpacked" and select the folder where the files you just extracted are.

Add to Opera:
1. Download the .zip file from /chromesrc in this repository.
2. Extract the files into their own folder.
2. Go to opera://extensions/
3. Enable "Developer Mode"
4. Select "Load unpacked" and select the folder where the files you just extracted are.


*Note: Make sure you're selecting the folder containing the extension files (i.e. manifest.json, background.js) not a folder containing that folder.*

## Features:
- Ensures pages do not display your personal information, EVEN while and before loading.
- Prevents changes to the pages from showing your personal information.
- Ability to specifiy any string as personal information.
- Warns users if a page is not fully supported by the extension, to prevent them from accidently leaking their information.

## Known Issues:
- Must be updated when new unsupported sites are reported (and manaully updated on Chrome/Opera).  
- Tab title is still visible during load, leaking personal information contained in the title.
- PII can be determined by looking for what text is changed (Credit: u/cn0MMnb)

## Upcoming Updates:
**Status of Whitelist Feature:** Ability to manaully specify whitelisted domains in the options is added, and the whitelist is functional. I am just implementing a "Add site to whitelist" button now.
- Option to add sites to a whitelist (Currently being worked on)
- Add a counter to the extension icon in the toolbar, showing how much personal information was removed.
- Regex support (i.e. [0-9][0-9][0-9]\ Street\ Name) (Credit: u/VKNiLive)
- Implement feature to add randomly generated PII to user settings, to make determining which PII is accurate to the user very difficult.
- Find and implement workaround to hide tab title during load.
- External site for unsupported URL's and module to check site every 24 hours for new unsupported URL's and store them in browser storage
- Button to toggle tool on/off
- Option to specify a word to replace personal information with (Ex: Redacted)
- Experimental feature to hide the window from capture software (being worked on by: https://github.com/ConniBug)  
- Integration with experimental feature to call the window hider while unsupported sites are open.

# Changelog:
**(UPCOMING) v1.7.0**
- Performance improvements, removed unneccessary if-statement  (https://github.com/AidanSpeakss/streamer-mode-for-firefox/pull/9)
- Fix special characters breaking some pages (https://github.com/AidanSpeakss/streamer-mode-for-firefox/issues/4)
- Added support for Regular Expressions (https://github.com/AidanSpeakss/streamer-mode-for-firefox/issues/6)
- Add whitelist feature (in-progress, sorry for the delay, I am a student and have other priorities)  

**(LATEST) v1.6.51**
- Fixed bug in the implementation of another bug fix

**v1.6.5**
- Fixed a bug that caused only partial PII to be removed in some instances

**v1.6.42**
- Fixed a bug that caused titles not to be checked for PII when changed

**v1.6.41**
- Added https://coronavirus.data.gov.uk/ to unsupported sites, until whitelist feature is added

**v1.6.4**
- Fixed issue with Google Docs breaking by modifying CSS, still unsupported though
- Fixed YouTube.com breaking with the extension

**v1.6.3**
- Added specific check for document title
- Added YouTube to unsupported sites (Google products have a weird bug I need to look into)

**v1.6.2:**
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
