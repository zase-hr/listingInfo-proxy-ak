require('newrelic');

const express = require('express');
const request = require ('request');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');



const app = express();
app.use(express.static(path.join(__dirname, '../public')));
app.use(bodyParser.json());
app.use(cors());

const LB_ADDRESS = 'http://localhost/api';  // http://172.31.46.42:3002

let bundleContent;
request(LB_ADDRESS+"/bundle.js", (err, response, body) => {
  bundleContent = body;
  console.log('bundle loaded and cached from server');
});

app.get('/bundle.js', (req, res) => {
  res.status(200).send(bundleContent);
});

app.get('/listing/:id', (req, res) => {
  let {id} = req.params;
  request(LB_ADDRESS+"/listing/" + id  ,(error, response, body) => {
    if (error) {
      res.status(404).send(error);
    } else {
      res.status(200).send(body);
    }
  });
});

app.listen(3030, () => {
  console.log('Proxy listening on port 3030');
});

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// var proxy = require('http-proxy').createProxyServer();

// let serverOne = 'http://localhost:3002';


// app.all('/api/listing/:id', (req, res) => proxy.web(req, res, {target:serverOne}));