function saveOptions(e) {
    browser.storage.local.set({
        pii: document.querySelector("#pii").value
    });
    e.preventDefault();
}

function restoreOptions() {
    let gettingPII = browser.storage.local.get('pii');
    gettingPII.then((res) => {
        if(res.pii){
            document.querySelector("#managed-pii").innerText = res.pii;
            document.querySelector("#pii").value = res.pii;
            document.querySelector("#managed-pii").style.color = "";
        }
    });
}

document.addEventListener('DOMContentLoaded', restoreOptions);
document.querySelector("form").addEventListener("submit", saveOptions);



