const express = require('express');
const promMid = require('express-prometheus-middleware');
const app = express();
const server = require('http').createServer(app);
const cors = require('cors');

const token = 'mysecrettoken';
const port = 4000;

// Prometheus config: https://www.npmjs.com/package/express-prometheus-middleware
app.use(
  cors({
    origin: 'http://localhost:3000',
    methods: ['GET'],
    credentials: true,
    authorization: token,
  }),
  promMid({
    metricsPath: '/metrics',
    collectDefaultMetrics: true,
    requestDurationBuckets: [0.1, 0.5, 1, 1.5],
  })
);

// curl -X GET http://localhost:4000/time
// curl -X GET http://localhost:4000/metrics
// curl -X GET user:password@localhost:4000/metrics

app.get('/time', function (req, res) {
  if (req.header.authorization !== token) {
    res.statusCode = 403;
    res.json({ message: 'access forbidden' });
  } else {
    const now = Date.now();

    res.statusCode = 200;
    res.json({
      time: now,
      properties: {
        epoch: {
          description: 'The current server time, in epoch seconds, at time of processing the request.',
          type: 'number',
        },
      },
      required: ['epoch'],
      type: 'object',
    });
  }
});

app.get('/metrics', function (req, res) {
  if (req.header.authorization !== token) {
    res.statusCode = 403;
    res.json({ message: 'access forbidden' });
  } else {
    res.statusCode = 200;
    res.json({ 'message': 'access granted' });
  }
});

server.listen(port, () => {
  console.log(`server running on port ${port}`);
});
