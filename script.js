window.Telegram.WebApp.ready();

const DemoApp = {
    initData      : Telegram.WebApp.initData || '',
    initDataUnsafe: Telegram.WebApp.initDataUnsafe || {},
    MainButton    : Telegram.WebApp.MainButton,


    init(options) {
        document.body.style.visibility = '';
        Telegram.WebApp.ready();
        Telegram.WebApp.MainButton.setParams({
            text      : 'CLOSE WEBVIEW',
            is_visible: true
        }).onClick(DemoApp.close);
    },

    checkInitData() {
        const webViewStatus = document.querySelector('#webview_data_status');
        if (DemoApp.initDataUnsafe.query_id &&
            DemoApp.initData &&
            webViewStatus.classList.contains('status_need')
        ) {
            webViewStatus.classList.remove('status_need');
            DemoApp.apiRequest('checkInitData', {}, function (result) {
                if (result.ok) {
                    webViewStatus.textContent = 'Hash is correct (async)';
                    webViewStatus.className   = 'ok';
                } else {
                    webViewStatus.textContent = result.error + ' (async)';
                    webViewStatus.className   = 'err';
                }
            });
        }
    },
};

DemoApp.checkInitData();
DemoApp.init();


document.getElementById('userForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const age = document.getElementById('age').value;
    const address = document.getElementById('address').value;

    const data = {
        name: name,
        age: age,
        address: address,
        query_id: window.Telegram.WebApp.initDataUnsafe.query_id
    };

    Telegram.WebApp.sendData(JSON.stringify(data)); // Envia os dados para o bot do Telegram
});

