const NAME = 'AIT-BusInfo';
const VERSION = '1.089';
const CACHE_NAME = NAME + VERSION;

const STATIC_DATA = [
    '/AIT-BusInfo/index.html',
    '/AIT-BusInfo/nobus.html',
    '/AIT-BusInfo/static/css/font-awesome.min.css',
    // '/AIT-BusInfo/static/css/main.css',
    '/AIT-BusInfo/static/css/noscript.css',
    '/AIT-BusInfo/static/css/images/overlay.png',
    '/AIT-BusInfo/static/images/bus.png',
    '/AIT-BusInfo/static/images/icon.png',
    '/AIT-BusInfo/static/images/icon128.png',
    '/AIT-BusInfo/static/images/icon256.png',
    '/AIT-BusInfo/static/images/icon512.png',
    '/AIT-BusInfo/static/js/breakpoints.min.js',
    '/AIT-BusInfo/static/js/browser.min.js',
    'https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js',
    '/AIT-BusInfo/static/js/jquery.scrollex.min.js',
    '/AIT-BusInfo/static/js/jquery.scrolly.min.js',
    '/AIT-BusInfo/static/js/main.js',
    '/AIT-BusInfo/static/js/util.js',
    '/AIT-BusInfo/manifest.json',
    // '/AIT-BusInfo/sw.js',
    '/AIT-BusInfo/static/js/jsonParse.js?20210408'
];

// Service Worker へファイルをインストール
self.addEventListener('install', function (e) {
    e.waitUntil(
        caches.open(CACHE_NAME).then(function (cache) {
            return cache.addAll(STATIC_DATA);
        }),
        skipWaiting()
    );
});

// Service Worker スクリプト上で更新確認をする場合
ccc = self.registration.update();

// リクエストされたファイルが Service Worker にキャッシュされている場合
// キャッシュからレスポンスを返す
self.addEventListener('fetch', function (event) {
    if (event.request.cache === 'only-if-cached' && event.request.mode !== 'same-origin')
        return;
    event.respondWith(
        caches.match(event.request)
            .then(function (response) {
                if (response) {
                    return response;
                }
                return fetch(event.request);
            })
    );
});


// Cache Storage にキャッシュされているサービスワーカーのkeyに変更があった場合
// 新バージョンをインストール後、旧バージョンのキャッシュを削除する
// (このファイルでは CACHE_NAME をkeyの値とみなし、変更を検知している)
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(keys => Promise.all(
            keys.map(key => {
                if (!CACHE_NAME.includes(key)) {
                    console.log('Del!!!');
                    return caches.delete(key);
                }
            })
        )).then(() => {
            console.log(CACHE_NAME + "activated");
        })
    );
});