<h1 align="center">
    Streamer Mode for Firefox
</h1>

<p align="center">
    <a alt="FYI">
        <img src="https://img.shields.io/badge/FYI-Badges%20Are%20Cool-brightgreen" /></a>
    <a alt="Chrome Web Store">
        <img src="https://img.shields.io/chrome-web-store/price/cpdfpajodamflehhkgmpdhfobjdgfimj" /></a>
    <a alt="Mozilla Add-on Rating">
        <img src="https://img.shields.io/amo/stars/streamermode" /></a>
    <a alt="Mozilla Add-on">
        <img src="https://img.shields.io/amo/v/streamermode" /></a>
    <a alt="GitHub language count">
        <img src="https://img.shields.io/github/languages/count/AidanSpeakss/streamer-mode-for-firefox" /></a>
    <a alt="GitHub repo size">
        <img src="https://img.shields.io/github/repo-size/AidanSpeakss/streamer-mode-for-firefox" /></a>
    <a alt="GitHub issues">
        <img src="https://img.shields.io/github/issues/AidanSpeakss/streamer-mode-for-firefox" /></a>
    <a href="https://deepscan.io/dashboard#view=project&tid=16925&pid=20233&bid=546943" alt="DeepScan grade">
        <img src="https://deepscan.io/api/teams/16925/projects/20233/branches/546943/badge/grade.svg" /></a>
    <a href="https://www.codacy.com/gh/AidanSpeakss/streamer-mode-for-firefox/dashboard?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=AidanSpeakss/streamer-mode-for-firefox&amp;utm_campaign=Badge_Grade" alt="Codacy Badge">
        <img src="https://app.codacy.com/project/badge/Grade/a8514a4dea04408eb970f8cb265d223d" /></a>
</p>

# Explanation:
When people are sharing their screen on Discord, Zoom, or even on sites like Twitch.tv. They often use their browser to react to videos, present information, play a game, etc. And if they visit a page that displays their full name, email, or some other type of personal information, that information is visible to the stream and there is nothing they can do to stop it. That information can then be used to spam, dox, and harrass a streamer or a user of these platforms. Platforms like Discord have a built in 'Streamer Mode' that hides personal information on Discord. But these modes don't protect users when they are streaming their browser. Other sites or platforms could still display personal information and up until recently there was no tool to protect users. This extension is the tool that solves these problems. With it, you can prevent your information from getting in the hands of people that shouldn't have ever had it; by preemptively removing that information from pages, before those pages are even visible.

# Donate:
**XMR:** 43nkfFVcUFXNDYbZAHeqDt8Apjopj6nYp13VZT2z5XnJ5hU9Y1UQDR6fi9BbPnRV4ZU45npsfNXdjFtEYK17jS72NRGyYLp  
**Buy Me A Coffee:** https://www.buymeacoffee.com/devaidan

# Installing:
Add to Firefox: https://addons.mozilla.org/en-US/firefox/addon/streamermode/  
Add to Chrome/Opera: https://chrome.google.com/webstore/detail/streamer-mode-for-chrome/cpdfpajodamflehhkgmpdhfobjdgfimj

## Features:
- Ensures pages do not display your personal information, EVEN while and before loading.
- Prevents changes to the pages from showing your personal information.
- Ability to specifiy any string as personal information.
- Warns users if a page is not fully supported by the extension, to prevent them from accidently leaking their information.

## Known Issues:
- Must be updated when new unsupported sites are added.  
- Tab title is still visible during load, leaking personal information contained in the title.
- URL is still visible in the address bar, which could contain personally identifying information
- PII can be determined by looking for what text is changed (Credit: u/cn0MMnb)

## Upcoming Updates:
- Add a counter to the extension icon in the toolbar, showing how much personal information was removed.
- Ability to choose different ways to handle the PII: spoiler like in Discord, replace the text with a word, remove it all together, or specify a word to replace it with (https://github.com/AidanSpeakss/streamer-mode-for-firefox/issues/7)
- Implement feature to add randomly generated PII to user settings, to make determining which PII is accurate to the user very difficult.
- Find and implement workaround to hide tab title during load.
- External site for unsupported URL's and module to check site every 24 hours for new unsupported URL's and store them in browser storage
- Button to toggle tool on/off
- Experimental feature to hide the window from capture software (being worked on by: https://github.com/ConniBug)  
- Integration with experimental feature to call the window hider while unsupported sites are open.

# Changelog:
**(LATEST CHROME) v1.7.1c - (c) Chrome Release**
- Ported the v1.7.1 Firefox update to Chrome
- Removed some debugging code from extension
- Added error message for trying to add an invalid type of page to whitelist
- Fixed issue causing patron to break
- Improved the overlay for unsupported pages

**(LATEST FIREFOX) v1.7.1**
- Fixed issue causing patreon to break
- Improved the overlay for unsupported pages

**v1.7.0**
- Performance improvements, removed unneccessary if-statement  (https://github.com/AidanSpeakss/streamer-mode-for-firefox/pull/9)
- Fixed special characters breaking some pages (https://github.com/AidanSpeakss/streamer-mode-for-firefox/issues/4)
- Added support for Regular Expressions (https://github.com/AidanSpeakss/streamer-mode-for-firefox/issues/6)
- Added whitelist feature (https://github.com/AidanSpeakss/streamer-mode-for-firefox/issues/5)
- Frontend design improvements

**v1.6.51**
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
