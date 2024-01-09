# API-Gateway

The API-Gateway is the entry point for all requests to the backend services. Those requests are then forwarded to the respective (MQTT) services.

## Requirements and setup

Please refer to the entoothiast repository.

## Documentation

You can access the Swagger documentation at [http://localhost:3000/api-docs](http://localhost:3000/api-docs)

## Tests

This repository includes the integration tests, since they're run against the API gateway. The CI configuration can be found in the entoothiast repository (`.gitlab-ci.yml`).

## Development

Consider the following example:

```javascript
/**
 * Post /v1/users/login
 * @summary Logs in a user
 * @tags users
 * @return {object} 200 - Success response
 * @return {object} 400 - Bad request response
 */
router.post("/login", async (req, res, next) => {
  mqttReq.request(
    "v1/users/login",
    (payload) => {
      req.mqttResponse = payload
      return next()
    },
    JSON.stringify(req.body)
  )
})
```

1. When a new request is received, a new MQTT message is published under the
   topic `v1/users/login` with the payload of the HTTP request body.
2. The response - received over MQTT - is then forwarded to the callback function.
3. The callback function then sets the received response on the `req` object,
   so that the next middleware(s) can access it. Using `next()`, the next middleware
   is invoked.
4. The next middleware - declared in `index.js` - then sends the response to
   the client. For this to go smoothly, the `payload` - received from the MQTT services - should have a `httpStatus` property on it, which corresponds to a HTTP status code.
