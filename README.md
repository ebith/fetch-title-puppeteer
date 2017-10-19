# fetch-title-puppeteer
Headless Chromeでタイトルを取得してくるやつ

## Usage
```sh
curl -X POST https://fetch-title.now.sh/ -H 'Content-Type:application/json' -d '{"url": "https://example.com/"}'
```

## Deploy
```sh
yarn global add now
yarn run download-dockerfile
yarn run deploy
```
