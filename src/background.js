let h1 = document.createElement("h1");
function getElementsByXPath(xpath){
    let results = [];
    let query = document.evaluate(xpath, document || document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    for (let i = 0, length = query.snapshotLength; i < length; ++i) {
        results.push(query.snapshotItem(i));
    }
    return results;
}

function postload(){
    document.querySelector("#rt9879qaw4789uh").style.display = "none";
    h1.style.display = "none !important"
    document.body.style.display = "block";
}

function removePII(){
    getElementsByXPath("//*[contains(text(), 'Aidan')]").forEach( ele => { console.log("Item Removed"); ele.innerText = ele.innerText.replace('Aidan', "")});
    postload();
}

function preLoad(){
    h1.id = "rt9879qaw4789uh";
    h1.innerText = "Looking for and removing personal information...";
    h1.style.width = "100%";
    h1.style.height = "100%";
    h1.style.display = "block"
    document.body.appendChild(h1);
    removePII();
}


function childrenEater(children){
    if(children.hasChildNodes()){
        children.childNodes.forEach( child => {
             if (children.innerText.includes('Aidan')) {
                 children.innerHTML = children.innerHTML.replace('Aidan', "");
             }
            childrenEater(child);
        })
    } else {
        if (children.innerText.includes('Aidan')) {
            children.innerText = children.innerText.replace('Aidan', "");
        }
    }

}


let mutationObserver = new MutationObserver(function (mutations) {
    mutations.forEach(function (mutation) {
        childrenEater(mutation.target);
    });
});



mutationObserver.observe(document.body, {
    childList: true,
    subtree: true
});

preLoad();