const popsicle = require('popsicle');
const options = {
  method: 'POST',
  url: 'http://localhost:8080/',
  headers: {
    'Content-Type': 'application/json'
  }
}

const urls = [
  'https://youtu.be/c2ExwOAjLNw', // async
  'http://2ch.sc/',               // Shift_JIS
  'http://www.4gamer.net/',       // EUC-JP
  'https://goo.gl/SpKEL1',        // image
]

for (const url of urls) {
  options.body = { url: url };
  popsicle.request(options).use(popsicle.plugins.parse('json')).then((response) => {
    console.log(response.body.title);
  }).catch(error => { console.log(error) });
}
