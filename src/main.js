const googlehome = require('google-home-notifier');
const language = 'ja';

googlehome.ip('192.168.1.151');
googlehome.device('この世界', language); 

var msg = 'おいっすー';
if (process.argv.length > 2) {
  msg = '';
  for (var i = 2; i < process.argv.length; i++) {
    msg += ' ' + process.argv[i];
  }
//  msg = process.argv[2];
}

googlehome.notify(msg, function(res) {
  console.log(res);
});
