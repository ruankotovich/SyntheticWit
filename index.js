var servlet = require('./server');
var data = require('./data');

var app = new servlet('127.0.0.1', 3001);

app.get('/sw-classes', function (req, res) {
  if (req.paramethers.query) {
    res.write(JSON.stringify(data.findClass(req.paramethers.query)));
  } else {
    res.write(JSON.stringify(data.classes));
  }
  res.end();
});

app.get('/sw-documents', function (req, res) {

  if (req.paramethers.query) {
    res.write(JSON.stringify(data.findDocument(req.paramethers.query)));
  } else {
    res.write(JSON.stringify(data.documents));
  }

  res.end();
});

app.options('/sw-classes', function (req, res) {
  res.end();
});

app.options('/sw-documents', function (req, res) {
  res.end();
});

app.post('/sw-documents', function (req, res) {
  let body = req.body;
  data.documents.push(JSON.parse(body));
  res.end();
});

app.post('/sw-classes', function (req, res) {
  let body = req.body;
  data.classes.push(JSON.parse(body));
  res.end();
});

app.addInterceptor(function (req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Content-Type', 'application/json;charset=UTF=8');
})