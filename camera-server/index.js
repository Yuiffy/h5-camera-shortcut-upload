var http = require("http")
var url = require("url");
var fs = require("fs");
var express = require("express")
var formidable = require('formidable')
util = require('util');
var app = express()
var port = process.env.PORT || 5000

app.use(express.static(__dirname + "/"))

var server = http.createServer(app)
server.listen(port)

console.log("http server listening on %d", port)

app.post('/', function(req, res) {
  res.send({"success": "true"});
});

app.post('test', (req, res) => {
  res.send({"success": "true"});
});

app.post('/ocr/uploadImage', (req, res) => {
  var form = new formidable.IncomingForm();
  form.uploadDir = "./myDir";
  form.on('file', function(field, file) {
    //rename the incoming file to the file's name
    fs.rename(file.path, file.path + "_" + file.name, (e) => {
      console.log('fs.rename', e)
    });
  });
  form.parse(req, function(err, fields, files) {
    // res.writeHead(200, {'content-type': 'text/plain'});
    console.log("files", files);
    const ret = util.inspect({fields: fields, files: files});
    ret.base = {ret: 0, msg: "hello!"};
    res.send(JSON.stringify(ret));
  });

});
