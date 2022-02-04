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

const Address = {
    'ANY': '*://*/*',
    'ANY_PATH': '/*',
    'ANY_PROTOCOL': '*://',
    'CHROME': 'chrome:',
    'CHROME_EXTENSION': 'chrome-extension:',
    'EXAMPLE': 'example.org',
    'HTTP': 'http:',
    'HTTPS': 'https:',
    'RESOURCE_PATH': '/resources',
    'ROOT_PATH': '/',
    'WWW_PREFIX': 'www.',
    'FIREFOX': 'about:',
    'FIREFOX_EXTENSION': 'moz-extension:'
};

let targetTab;
let domain;
function determineActiveTab() {
    return new Promise((resolve) => {
        let queryParameters = {'active': true, 'currentWindow': true};
        browser.tabs.query(queryParameters, function (tabs) {
            if (tabs[0]) {
                resolve(tabs[0]);
            } else {
                queryParameters = {'active': true};
                browser.tabs.query(queryParameters, function (tabs) {
                    resolve(tabs[0]);
                });
            }
        });
    });
};

function normalizeDomain(domain) {
    domain = domain.toLowerCase().trim();
    if (domain.startsWith(Address.WWW_PREFIX)) {
        domain = domain.slice(Address.WWW_PREFIX.length);
    }
    return domain;
};

function extractDomainFromUrl(url = '', normalize) {
    let extractedDomain;
    try {
        extractedDomain = new URL(url).host;
    } catch (exception) {
        extractedDomain = null;
    }
    if (url.startsWith(Address.CHROME) || url.startsWith(Address.FIREFOX)) {
        extractedDomain = null;
    }

    if (extractedDomain === '') {
        extractedDomain = null;
    }

    if (extractedDomain !== null && normalize === true) {
        extractedDomain = normalizeDomain(extractedDomain);
    }

    return extractedDomain;
};

function determineTargetTab() {
    return new Promise((resolve) => {
        determineActiveTab().then((activeTab) => {
            targetTab = activeTab;
            domain = extractDomainFromUrl(activeTab.url, true);
            resolve();
        });
    });
};

async function addSiteToWhitelist(){
    let gettingWhitelist = browser.storage.local.get('whitelist');
    gettingWhitelist.then(async (res) => {
        if (res.whitelist) {
            await determineTargetTab();
            let cleansedWhitelist = domain + ",";
            document.querySelector("#whitelist").value.split(",").forEach(temp => {
                    cleansedWhitelist += temp.trim() + ",";
                }
            );
            cleansedWhitelist = cleansedWhitelist.substring(0, cleansedWhitelist.length - 1);
            document.querySelector("#managed-whitelist").value = cleansedWhitelist;
            document.querySelector("#whitelist").value = cleansedWhitelist;
            browser.storage.local.set({
                whitelist: cleansedWhitelist
            });
        } else {
            await determineTargetTab();
            document.querySelector("#managed-whitelist").value = domain;
            document.querySelector("#whitelist").value = domain;
            browser.storage.local.set({
                whitelist: domain
            });
        }
    });
}
document.querySelector("#addSite").addEventListener("click", addSiteToWhitelist)
document.addEventListener('DOMContentLoaded', restoreOptions);
document.querySelector("form").addEventListener("submit", saveOptions);


