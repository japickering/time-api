const express = require('express');
const promMid = require('express-prometheus-middleware');
const app = express();
const server = require('http').createServer(app);
const cors = require('cors');

const port = 4000;

// Configure CORS: https://www.npmjs.com/package/cors
app.use(cors());

// throwing errors when applies to express routes in local tests
// const corsOptions = {
//   origin: 'localhost',
//   optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
// };

// Express Prometheus config: https://www.npmjs.com/package/express-prometheus-middleware
app.use(
  promMid({
    metricsPath: '/metrics',
    collectDefaultMetrics: true,
    requestDurationBuckets: [0.1, 0.5, 1, 1.5],
    //  requestLengthBuckets: [512, 1024, 5120, 10240, 51200, 102400],
    //  responseLengthBuckets: [512, 1024, 5120, 10240, 51200, 102400],
    /**
     * Uncomenting the `authenticate` callback will make the `metricsPath` route
     * require authentication. This authentication callback can make a simple
     * basic auth test, or even query a remote server to validate access.
     * To access /metrics you could do:
     * curl -X GET user:password@localhost:9091/metrics
     */
    authenticate: (req) => req.headers.authorization === 'tmgo2022',
    /**
     * Uncommenting the `extraMasks` config will use the list of regexes to
     * reformat URL path names and replace the values found with a placeholder value
     */
    // extraMasks: [/..:..:..:..:..:../],
    /**
     * The prefix option will cause all metrics to have the given prefix.
     * E.g.: `app_prefix_http_requests_total`
     */
    // prefix: 'app_prefix_',
    /**
     * Can add custom labels with customLabels and transformLabels options
     */
    // customLabels: ['contentType'],
    // transformLabels(labels, req) {
    //   // eslint-disable-next-line no-param-reassign
    //   labels.contentType = req.headers['content-type'];
    // },
  })
);

// curl -X GET http://localhost:4000/time
app.get('/time', function (req, res) {
  res.json({ time: Date.now() });
});

// Regular route for metrics
// curl -X GET http://localhost:4000/metrics

// example authentication
// curl -X GET user:password@localhost:4000/metrics

app.get('/metrics', function (req, res) {
  res.json({ message: 'metrics' });
});

server.listen(port, () => {
  console.log(`server running on http://localhost:${port}`);
});
