function saveOptions(e) {
    let cleansedPII = "";
    document.querySelector("#pii").value.split(",").forEach(temp =>
        {
            cleansedPII += temp.trim() + ",";
        }
    );
    cleansedPII = cleansedPII.substring(0, cleansedPII.length - 1);
    document.querySelector("#pii").value = cleansedPII;
    document.querySelector("#managed-pii").innerText = cleansedPII;


    let cleansedRegexPII = "";
    document.querySelector("#regex-pii").value.split(",").forEach(temp =>
        {
            cleansedRegexPII += temp.trim() + ",";
        }
    );
    cleansedRegexPII = cleansedRegexPII.substring(0, cleansedRegexPII.length - 1);
    document.querySelector("#regex-pii").value = cleansedRegexPII;
    document.querySelector("#managed-regex-pii").innerText = cleansedRegexPII;

    browser.storage.local.set({
        pii: document.querySelector("#pii").value
    });
    browser.storage.local.set({
        regexpii: document.querySelector("#regex-pii").value
    })
    e.preventDefault();
}

function restoreOptions(){
    let gettingPII = browser.storage.local.get('pii');
    gettingPII.then((res) => {
        if(res.pii){
            document.querySelector("#managed-pii").innerText = res.pii;
            document.querySelector("#pii").value = res.pii;
            document.querySelector("#managed-pii").style.color = "";
        }
    });

    let gettingRegexPII = browser.storage.local.get('regexpii');
    gettingRegexPII.then((res) => {
        if(res.regexpii){
            document.querySelector("#managed-regex-pii").innerText = res.regexpii;
            document.querySelector("#regex-pii").value = res.regexpii;
            document.querySelector("#managed-regex-pii").style.color = "";
        }
    });
}

document.addEventListener('DOMContentLoaded', restoreOptions);
document.querySelector("form").addEventListener("submit", saveOptions);


