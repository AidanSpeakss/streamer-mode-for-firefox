let data = [];
let regexdata = [];

function escapeRegExp(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
}

function insertionSort(inputArr){
    let length = inputArr.length;
    for (let i = 1; i < length; i++) {
        let key = inputArr[i];
        let j = i - 1;
        while (j >= 0 && inputArr[j].length < key.length) {
            inputArr[j + 1] = inputArr[j];
            j = j - 1;
        }
        inputArr[j + 1] = key;
    }
    return inputArr;
};

function getElementsByXPath(xpath){
    let results = [];
    const query = document.evaluate(xpath,  document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    for (let i = 0, length = query.snapshotLength; i < length; ++i)
        results.push(query.snapshotItem(i));
    return results;
}

function piiSearch(ele){

    data.forEach(pii => {
        let temp = escapeRegExp(pii);
        console.log(temp);
        const regExEscaped = new RegExp(temp, "ig");
        ele.textContent = ele.textContent.replace(regExEscaped, "");
    })
    regexdata.forEach(regex => {
        const regexp = new RegExp(regex, "ig");
        ele.textContent = ele.textContent.replace(regexp, "");
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
        const regEx = new RegExp(escapeRegExp(pii), "ig");
        document.title = document.title.replace(regEx, "");
    })
    regexdata.forEach(regex => {
        const regexp = new RegExp(regex, "ig");
        document.title = document.title.replace(regexp, "");
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
    data.forEach(pii => {
        const regEx = new RegExp(escapeRegExp(pii), "ig");
        document.title = document.title.replace(regEx, "");
    })
    regexdata.forEach(regex => {
        const regexp = new RegExp(regex, "ig");
        document.title = document.title.replace(regexp, "");
    })
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

async function getData(){
    const storageItemPii = browser.storage.local.get('pii');
    await storageItemPii.then(async (res) => {
        if (res.pii) {
            res.pii.split(",").forEach(temp => {
                data.push(temp);
            });
            data = insertionSort(data);
        }
    });
    const storageItemRegexPii = browser.storage.local.get('regexpii');
    await storageItemRegexPii.then(async (res) => {
        if (res.regexpii) {
            res.regexpii.split(",").forEach(temp => {
                regexdata.push(temp);
            });
            regexdata = insertionSort(regexdata);
        }
    })
    removePII();
}
getData();
