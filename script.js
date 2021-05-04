
function getBrowser() {
    if(typeof browser !== 'undefined') {
        return browser
    }else if(typeof chrome !== 'undefined') {
        return chrome
    }
}

browser = getBrowser();

window.onload = function (){
    browser.storage.sync.get(function (data) {
        if (!(data.on === undefined)) {
            document.getElementById('onoffswitch').checked = (data.on ? true : false);
        } else {
            document.getElementById('onoffswitch').checked = true;

            browser.storage.sync.set({
                on: 1
            });
        }
        let profile = {
            'username' : '',
            'password' : '',
            'msg': ''
        };
        if (data.profile) {
            profile = JSON.parse(data.profile);
        }
        document.getElementById('username').value = profile.username;
        document.getElementById('password').value = profile.password;
        document.getElementById('msg').value = profile.msg;

    });

    this.document.getElementById('onoffswitch').addEventListener('change', function () {
        browser.storage.sync.set({
            on: (this.checked ? 1 : 0)
        });
    });
    this.document.getElementById('saveProfile').addEventListener('click', function(){
        let username = document.getElementById('username').value;
        let password = document.getElementById('password').value;
        let msg = document.getElementById('msg').value;
        let profile = {
            'username' : username,
            'password' : password,
            'msg':msg
        }
        browser.storage.sync.set({
            profile: JSON.stringify(profile)
        });
        document.getElementById('response').innerText = '저장되었습니다!';
    });

};

