let data = [];

function getElementsByXPath(xpath){
    let results = [];
    const query = document.evaluate(xpath,  document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    for (let i = 0, length = query.snapshotLength; i < length; ++i)
        results.push(query.snapshotItem(i));
    return results;
}

function piiSearch(ele){
    data.forEach(pii => {
        if(ele.textContent.toLowerCase().includes(pii.toLowerCase())) {
            const regEx = new RegExp(pii, "ig");
            ele.textContent = ele.textContent.replace(regEx, "");
        }
    })
}

function removePII(){
    getElementsByXPath("//text()").forEach( ele => {
        if (ele.hasChildNodes())
            childrenEater(ele);
        else
            piiSearch(ele);
    });
    data.forEach(pii => {
        if(document.title.toLowerCase().includes(pii.toLowerCase())) {
            const regEx = new RegExp(pii, "ig");
            document.title = document.title.replace(regEx, "");
        }
    })
    document.body.style.visibility = "visible";
}

function childrenEater(parent){
    parent.childNodes.forEach( child => {
        if (child.hasChildNodes())
            childrenEater(child);
         else
            piiSearch(child);
    });
}

const mutationObserver = new MutationObserver(function (mutations) {
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

const storageItemPii = browser.storage.local.get('pii');
storageItemPii.then((res) => {
    if(res.pii){
        res.pii.split(",").forEach( temp =>{ data.push(temp); });
        removePII();
    } else
        document.body.style.visibility = "visible";
});
