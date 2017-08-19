var http = require('http');
var url = require('url');

let handleBody = function (req, res, _callback) {
  let body = [];

  req.on('data', function (chunk) {
    body.push(chunk);
  });

  req.on('end', function () {
    req.body = Buffer.concat(body);
    _callback();
  });
}

let initializeRoutes = function (methods, routes, api) {
  methods.forEach(function (method) {
    routes[method] = {}; // to create the initial object
    api[method.toLowerCase()] = function (route, fn) {
      routes[method][route] = fn; // to bind the route to the function
    };
  });
};

let executeInterceptors = function (interceptors, req, res) {
  interceptors.forEach(function (interceptor) {
    interceptor(req, res);
  });
};

let servlet = function (ip, port) {
  let interceptors = []; // to alloc the interceptors;

  let methods = ['GET', 'POST', 'OPTIONS'];
  let routes = {}; // to save the routes
  let api = {}; // to save the api methods and listeners and so on

  initializeRoutes(methods, routes, api);

  api.addInterceptor = function (interceptor) {
    interceptors.push(interceptor);
  }

  http.createServer(function (req, res) {
    handleBody(req, res, function () {

      var parsedUrl = url.parse(req.url, true); // true to get query as object

      executeInterceptors(interceptors, req, res);

      var requiredRoute = routes[req.method][parsedUrl.pathname];

      if (requiredRoute) { // should the route exists
        req.paramethers = parsedUrl.query;
        requiredRoute(req, res); // execute the required route
      } else { // should the route doesn't exist
        res.statusCode = 404;
        return res.end();
      }

    });

  }).listen(port, ip);

  return api;
};

module.exports = servlet;