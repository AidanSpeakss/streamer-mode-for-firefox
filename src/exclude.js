function hidePopup(){
    document.querySelector("#streamerModePopup").style.display = "none";
    let style = document.createElement('style');
    style.innerHTML = `
          body {
            visibility: visible !important;
          }
        `;
    style.id = "stramerModeStyles";
    document.head.appendChild(style);
}

function hideWarning(){
    let popup = document.createElement("div");
    popup.id = "streamerModePopup";
    popup.innerText = "Streamer mode does not work on this site, your personal information may be visible. Be careful!";
    popup.style.cssText = "text-align: center; width: 100vw; height: 100vh; position: absolute; z-index: 2147483647; font-size: 5vw; display: block; visibility: visible !important; top: 0px; left: 0px; background-color: white; color: red;"
    let btn = document.createElement("button");
    btn.style.cssText = "display: block; font-size: 5vw; margin: auto; border: 2px gray solid; border-radius: 10px; background: red; color: white; padding: 15px;"
    btn.innerText = "Acknowledged";
    btn.addEventListener("click", hidePopup)
    popup.appendChild(btn);
    document.body.appendChild(popup)
}

function preLoad(){
    hideWarning();
}

preLoad();
