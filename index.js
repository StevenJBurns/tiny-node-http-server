"use strict";

const fs = require("fs");
const path = require("path");
const http = require("http");
const chalk = require("chalk");

const nodeServer = http.createServer(handleRequest);

function handleRequest(req, res) {
  let { headers, method, url } = req

  console.log(chalk.bgBlue.black(`\n Incoming ${req.method} Request -- URL: ${req.url} `));
  
  // res.writeHead(200);
  // res.write(`<html>\n<body>\n<h1>${req.method}</h1>\n</body>\n</html>`)
  // res.end();
  console.log(chalk.bgGreen.black(` Outgoing Request -- STATUS: 200 `));

  // console.log(headers["authorization"]);
  // console.log(req.url);

  switch (req.method) {
    case "HEAD" :
      break;
    case "GET" :
      if (req.url == "/admin" && !headers["authorization"]) {
        res.statusCode = 401;
        res.setHeader("WWW-Authenticate", "Basic realm='Admin Access', charset='UTF-8'");
      } else {
        res.writeHead(200);
      }
      break;
    case "POST" :
      break;
    case "PATCH" :
      break;
    case "PUT" :
      break;
    case "DELETE" :
      break;
    default :
    console.log(`${req.method} received`);
      break;
  }
  res.end();
}

nodeServer.listen(8192, () => {
  console.clear();
  console.log(chalk.inverse(" Server running. Listening on port 8192 "));
});