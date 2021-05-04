function getBrowser() {
    if(typeof browser !== 'undefined') {
        return browser
    }else if(typeof chrome !== 'undefined') {
        return chrome
    }
}


browser = getBrowser();
function getElementByXpath(doc,path) {
    return doc.evaluate(path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
  };

window.onload = function () {
    
    browser.storage.sync.get(function (data) {
        if (data.on) {
            if (data.profile){
                let profile = JSON.parse(data.profile);
                let user_id = profile.username;
                let user_pw = profile.password;
                let msg = profile.msg;
                

                if (window.location.href.indexOf('/login') >=0){
                    this.document.getElementsByName('username')[0].value = user_id;
                    this.document.getElementsByName('password')[0].value = user_pw;
                    getElementByXpath(this.document, `/html/body/div/div/div/form/div[2]/button`).click();
                }
                else if (window.location.href.indexOf('/register') >=0){
                    getElementByXpath(this.document,`/html/body/div/div/div/form/div/div[1]/select`).value = 'WORK';
                    getElementByXpath(this.document,`/html/body/div/div/div/form/div/div[2]/input`).value = msg;
                    getElementByXpath(this.document,`/html/body/div/div/div/form/div/div[4]/div[2]/button`).click();
                    
                }else if (window.location.href.indexOf('/two-step-verification') >=0){
                    getElementByXpath(this.document,`/html/body/div/div/div[1]/form/div/div/div[1]/button`).click();
                }
            }


        }
    });
    console.log(window.location.hostname);
};