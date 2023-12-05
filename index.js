// index.js
// where your node app starts

// init project
const express = require('express');
const app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
const cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// your first API endpoint...
app.get('/api/hello', function(req, res) {
  res.json({greeting: 'hello API'});
});

// listen for requests :)
const listener = app.listen(3001, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});

app.get('/api/:date?', (req,res) => {
  console.log(req.params['date'])
  function isValidDate(d) {
    return d instanceof Date && !isNaN(d);
  }

  let dateParam = req.params['date'];
  let date = new Date();

  if(dateParam !== undefined) {
    let num = Number(dateParam);
    if (!isNaN(num)) {
      dateParam = +dateParam;
    }

    date = new Date(dateParam);
  }

  if(!isValidDate(date)) {
    res.json({ error : "Invalid Date"})
  }

  res.json({unix: Math.floor(date.getTime()), utc: date.toUTCString()})
})
