# Server Time API Specification

Create a Node Express server that serves an api endpoint /time that accepts a GET request and
returns a JSON response that includes the current server time, in epoch seconds, at the time of processing the request.

The API should return a 403 response code for all API requests that do not include header Authorization with value 'mysecrettoken'.

Responses returned from the API should validate against the following JSON schema:

## GET /time
```
{
 "properties": {
 "epoch": {
 "description": "The current server time, in epoch
seconds, at time of processing the request.",
 "type": "number"
 }
 },
 "required": ["epoch"],
 "type": "object"
}
```

## GET /metrics
Response should serve all available Prometheus-format metrics for the API, including default recommended metrics (see configuration value collectDefaultMetrics).