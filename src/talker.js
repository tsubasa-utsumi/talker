var PORT = 8693;
var url = 'http://www.rinkobus-navi.jp/blsys/loca?VID=ldt&EID=nt&DSMK=80&DK=2g_5b_3k-2g_5b_3m-2g_5b_3u-2g_5b_bq-2g_5b_2vbp0d';

var googlehome = require('google-home-notifier');
var language = 'ja';
googlehome.ip('192.168.1.151');
googlehome.device('この世界', language);

var parser = require('body-parser');
var cheerio = require('cheerio-httpcli');
var express = require('express');
var app = express();
app.use(parser.urlencoded({ extended: true }));
app.use(parser.json());

var server = app.listen(PORT, function() {
  console.log('start talker. listening port is ' + server.address().port);
});

app.get('/api/talk', function(req, res, next) {
  googlehome.notify(req.text, function(){});
});

app.post('/', function(req, res) {
  var jst = 1000 * 60 * 60 * 9;
  cheerio.fetch(url, function(err, $, res) {
    var times = $('[class^=cell-serch-ff]');
    var count = Math.min(4, times.length);
    var diff = [];

    var now = new Date();
    now.setTime(now.getTime() + jst);
    for (var i = 0; i < count; i++) {
      var at = $($(times[i]).find('td')[1]).text();
      var formatted = now.getFullYear() + '/' + (now.getMonth() + 1 ) + '/' + (now.getDate() - 1) + ' ' + at;
      console.log(formatted);
      var remain = new Date(formatted);
      remain.setTime(remain.getTime() + jst);

      var d = remain.getTime() - now.getTime();
      d = d / (1000*60);
      d = Math.floor(d);
      diff.push(d);
    }

    var msg = "";
    if (diff.length === 0) {
      msg = "次のバスはありません";
    } else {
      msg = "次まで" + diff.join('分') + '分です';
    }
    googlehome.notify(msg, function(){});
  });

  res.send('done');

});

app.post('/talk', function(req, res) {
  googlehome.notify(req.body.value1, function(){});
  res.send('done');
});
