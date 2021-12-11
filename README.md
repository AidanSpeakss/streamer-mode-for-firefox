# hidemypii
Firefox extension to remove PII (personally identifying information) from pages before they are visibible.

**Installation:**
1. Download Zip file "HideMyPII.zip"
2. Go to: about:debugging#/runtime/this-firefox in a new tab.
3. Click on "Load Temporary Add-on.."
4. Select "HideMyPII.zip"
5. Your set!


**Known Issues:**
- Modifies URL's.  
- Must be manaully updated when new unsupported sites are reported.  


**Upcoming Patches v1.5:**
- Fix to modifying URL's.  
- Addition of an external list of unsupported sites, and code to retrieve the list and compare each URL to the current window's domain name for matches. 


**Upcoming v2 Update:**
- Experimental feature to hide the window from capture software (being worked on by: https://github.com/ConniBug)  
- Integration with experimental feature to call the window hider while unsupported sites are open.
