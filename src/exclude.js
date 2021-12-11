function hideWarning(){
    document.body.style.display = "block";
}

function preLoad(){
    confirm("HideMyPII does not work on this site, your PII may be visible. Be careful!"); /*\nEnabling the experimental window hider feature will allow you to hide this window while this page is open.\n*/
    hideWarning();
}
preLoad();
