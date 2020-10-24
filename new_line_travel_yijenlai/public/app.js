const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const app = express();
const port = process.env.PORT || 3000;



app.get(/js|css|img/, (req, res) => {
  res.sendFile(`${__dirname}/${req.path}`);
});

app.get(/\//, (req, res) => {
  res.sendFile(`${__dirname}/index.html`);
});

// app.use('/api', createProxyMiddleware({ target: 'https://hereisanewapp.herokuapp.com', changeOrigin: true }));




app.listen(port);