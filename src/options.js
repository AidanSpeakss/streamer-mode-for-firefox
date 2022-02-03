function saveOptions(e) {
    let cleansedPII = "";
    document.querySelector("#pii").value.split(",").forEach(temp =>
        {
            cleansedPII += temp.trim() + ",";
        }
    );
    cleansedPII = cleansedPII.substring(0, cleansedPII.length - 1);
    document.querySelector("#pii").value = cleansedPII;
    document.querySelector("#managed-pii").value = cleansedPII;


    let cleansedRegexPII = "";
    document.querySelector("#regex-pii").value.split(",").forEach(temp =>
        {
            cleansedRegexPII += temp.trim() + ",";
        }
    );
    cleansedRegexPII = cleansedRegexPII.substring(0, cleansedRegexPII.length - 1);
    document.querySelector("#regex-pii").value = cleansedRegexPII;
    document.querySelector("#managed-regex-pii").value = cleansedRegexPII;

    let cleansedWhitelist = "";
    document.querySelector("#whitelist").value.split(",").forEach(temp =>
        {
            cleansedWhitelist += temp.trim() + ",";
        }
    );
    cleansedWhitelist = cleansedWhitelist.substring(0, cleansedWhitelist.length - 1);
    document.querySelector("#whitelist").value = cleansedWhitelist;
    document.querySelector("#managed-whitelist").value = cleansedWhitelist;

    browser.storage.local.set({
        pii: document.querySelector("#pii").value
    });
    browser.storage.local.set({
        regexpii: document.querySelector("#regex-pii").value
    });
    browser.storage.local.set({
        whitelist: document.querySelector("#whitelist").value
    });
    e.preventDefault();
}

function restoreOptions(){
    let gettingPII = browser.storage.local.get('pii');
    gettingPII.then((res) => {
        if(res.pii){
            document.querySelector("#managed-pii").value = res.pii;
            document.querySelector("#pii").value = res.pii;
        }
    });

    let gettingRegexPII = browser.storage.local.get('regexpii');
    gettingRegexPII.then((res) => {
        if(res.regexpii){
            document.querySelector("#managed-regex-pii").value = res.regexpii;
            document.querySelector("#regex-pii").value = res.regexpii;
        }
    });

    let gettingWhitelist = browser.storage.local.get('whitelist');
    gettingWhitelist.then((res) => {
        if(res.whitelist){
            document.querySelector("#managed-whitelist").value = res.whitelist;
            document.querySelector("#whitelist").value = res.whitelist;
        }
    });
}
document.addEventListener('DOMContentLoaded', restoreOptions);
document.querySelector("form").addEventListener("submit", saveOptions);


