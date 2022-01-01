let data = [];
function getElementsByXPath(xpath){
    let results = [];
    let query = document.evaluate(xpath, document || document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    for (let i = 0, length = query.snapshotLength; i < length; ++i) {
        results.push(query.snapshotItem(i));
    }
    return results;
}


function removePII(){
    getElementsByXPath("//*[contains(text(), '')]").forEach( ele => {
            if(ele.hasChildNodes()){
                ele.childNodes.forEach( child => {
                        if(child.nodeName == "#text" || child.nodeName == "A"){
                            data.forEach( pii => {
                                if(child.textContent.includes(pii)){
                                    child.textContent = child.textContent.replace(pii, "");
                                }
                            })

                        } else if(child.nodeName == "A") {
                        }
                    }
                )
            } else {
                if(ele.nodeName == "#text"){
                    data.forEach( pii => {
                        if(ele.textContent.includes(pii)){
                            ele.textContent = ele.textContent.replace(pii, "");
                        }
                    })
                }
            }
        }
    );
    document.body.style.display = "block";
}


function childrenEater(children){
    if(children.hasChildNodes()){
        children.childNodes.forEach( child => {
            if (child.hasChildNodes()) {
                childrenEater(child);
            } else if (child.parentElement.localName !== "a") {
                data.forEach(temp => {
                    if (child.textContent.includes(temp)) {
                        child.textContent = child.textContent.replace(temp, "");
                    }
                });
            }
        });
    } else {
        let child = children;
        if(child.parentElement.localName !== "a"){
            data.forEach(temp => {
                if (child.textContent.includes(temp)) {
                    child.textContent = child.textContent.replace(temp, "");
                }
            });
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

var storageItemPii = browser.storage.local.get('pii');
storageItemPii.then((res) => {
    if(res.pii){
        let tempArray = res.pii.split(",");
        tempArray.forEach( temp =>{ data.push(temp); });
        removePII();
    } else {
        document.body.style.display = "block";
    }
});
