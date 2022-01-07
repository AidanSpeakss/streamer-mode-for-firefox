let data = [];

function getElementsByXPath(xpath){
    let results = [];
    let query = document.evaluate(xpath, document || document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    for (let i = 0, length = query.snapshotLength; i < length; ++i)
        results.push(query.snapshotItem(i));
    return results;
}

function piiSearch(ele){
    data.forEach(pii => {
        let regEx = new RegExp(pii, "ig");
        if(ele.textContent.toLowerCase().includes(pii.toLowerCase()))
            ele.textContent = ele.textContent.replace(regEx, "");
    })
}

function removePII(){
    getElementsByXPath("//*[contains(text(), '')]").forEach( ele => {
        if (ele.hasChildNodes())
            childrenEater(ele);
        else
            piiSearch(ele);
    });
    document.body.style.display = "block";
}

function childrenEater(parent){
    parent.childNodes.forEach( child => {
        if (child.hasChildNodes())
            childrenEater(child);
         else
            piiSearch(child);
    });
}

let mutationObserver = new MutationObserver(function (mutations) {
    mutations.forEach(function (mutation) {
        if(mutation.target.hasChildNodes())
            childrenEater(mutation.target);
        else
            piiSearch(mutation.target);
    });
});

mutationObserver.observe(document.body, {
    childList: true,
    subtree: true
});

let storageItemPii = browser.storage.local.get('pii');
storageItemPii.then((res) => {
    if(res.pii){
        res.pii.split(",").forEach( temp =>{ data.push(temp); });
        removePII();
    } else
        document.body.style.display = "block";
});
