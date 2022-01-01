# Streamer Mode for Firefox
Hides personal information from pages, similar to Discord's Streamer mode.

Add to Firefox: https://addons.mozilla.org/en-US/firefox/addon/streamermode/

Features:
- Ensures page do not display your personal information, EVEN while and before loading.
- Prevents changes to the page from showing your personal information.
- Ability to specifiy any string as personal information.
- Warns users if a page is not fully supported by the extension, to prevent them from accidently leaking their information

**Known Issues:**
- Must be manaully updated when new unsupported sites are reported.  
- Doesn't support all sites
- Doesn't modify text within A elements

v1.5:
- Released on the addon store
- Fix to breaking links
- Name/Logo Change
- Removed console.logs from code

**Upcoming Updates:**
- External site for unsupported URL's
- Performance Improvements
- Option to specify a word to replace personal information with (Ex: Redacted)
- Experimental feature to hide the window from capture software (being worked on by: https://github.com/ConniBug)  
- Integration with experimental feature to call the window hider while unsupported sites are open.
