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


app.get('/listing/:id', (req, res) => {
  let {id} = req.params;
  request("http://127.0.0.1:3002/listing/" + id  ,(error, response, body) => {
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