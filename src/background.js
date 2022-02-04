let data = [];
let regexdata = [];
let whitelist = [];

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
    regexdata.forEach(regex => {
        const regexp = new RegExp(regex, "ig");
        ele.textContent = ele.textContent.replace(regexp, "");
    })
    data.forEach(pii => {
        const regExEscaped = new RegExp(escapeRegExp(pii), "ig");
        ele.textContent = ele.textContent.replace(regExEscaped, "");
    })
}

function removePII(){
    getElementsByXPath("//text()").forEach( ele => {
        if (ele.hasChildNodes())
            childrenEater(ele);
        else
            piiSearch(ele);
    });
    regexdata.forEach(regex => {
        const regexp = new RegExp(regex, "ig");
        document.title = document.title.replace(regexp, "");
    })
    data.forEach(pii => {
        const regEx = new RegExp(escapeRegExp(pii), "ig");
        document.title = document.title.replace(regEx, "");
    })
    let style = document.createElement('style');
    style.innerHTML = `
      body {
        visibility: visible !important;
      }
    `;
    style.id = "stramerModeStyles";
    console.log(style);
    document.head.appendChild(style);
}

function childrenEater(parent){
    parent.childNodes.forEach( child => {
        if (child.hasChildNodes())
            childrenEater(child);
        else
            piiSearch(child);
    });
    regexdata.forEach(regex => {
        const regexp = new RegExp(regex, "ig");
        document.title = document.title.replace(regexp, "");
    })
    data.forEach(pii => {
        const regEx = new RegExp(escapeRegExp(pii), "ig");
        document.title = document.title.replace(regEx, "");
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

async function getData() {
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
    const storageItemWhitelist = browser.storage.local.get('whitelist');
    await storageItemWhitelist.then(async (res) => {
        if (res.whitelist) {
            res.whitelist.split(",").forEach(temp => {
                whitelist.push(temp);
            });
            whitelist = insertionSort(whitelist);
        }
    });
    /*|| window.location.protocol == "file:" / Used for dev testing, uncomment out to use test files*/
    if (!whitelist.includes(new URL(window.location.href).host) || window.location.protocol == "file:")
        removePII();
    else {
        let style = document.createElement('style');
        style.innerHTML = `
          body {
            visibility: visible !important;
          }
        `;
        style.id = "stramerModeStyles";
        document.head.appendChild(style);
    }
}
getData();