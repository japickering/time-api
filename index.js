const express = require('express');
const promMid = require('express-prometheus-middleware');
const app = express();
const server = require('http').createServer(app);
const cors = require('cors');

const PORT = 4000;

app.use(cors());

// More info: https://www.npmjs.com/package/express-prometheus-middleware
// app.use(
//   promMid({
//     metricsPath: '/metrics',
//     collectDefaultMetrics: true,
//     requestDurationBuckets: [0.1, 0.5, 1, 1.5],
//     requestLengthBuckets: [512, 1024, 5120, 10240, 51200, 102400],
//     responseLengthBuckets: [512, 1024, 5120, 10240, 51200, 102400],
//   })
// );

// curl -X GET localhost:4000/hello?name=Chuck%20Norris
app.get('/hello', (req, res) => {
  console.log('GET /hello');
  const { name = 'Anon' } = req.query;
  res.json({ message: `Hello, ${name}!` });
});

// curl -X GET localhost:4000/time
app.get('/time', function (req, res) {
  res.send(
    JSON.stringify({
      time: Date.now(),
    })
  );
});

// curl -X GET localhost:4000/metrics
app.get('/metrics', function (req, res) {
  res.send(JSON.stringify({}));
});

server.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));
