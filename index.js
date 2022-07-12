const express = require('express');
const promMid = require('express-prometheus-middleware');
const app = express();
const server = require('http').createServer(app);
const cors = require('cors');

const PORT = 4000;

app.use(cors());

// Metrics info: https://www.npmjs.com/package/express-prometheus-middleware

// curl -X GET localhost:4000/time
app.get('/time', function (req, res) {
  res.json({ time: Date.now() });
});

// curl -X GET localhost:4000/metrics
app.get('/metrics', function (req, res) {
  res.json({ message: 'token missing' });
});

server.listen(PORT, () => {
  console.log(`server running on http://localhost:${PORT}`);
});
