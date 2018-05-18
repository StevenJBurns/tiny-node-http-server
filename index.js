"use strict";

const fs = require("fs");
const path = require("path");
const http = require("http");
const chalk = require("chalk");

const nodeServer = http.createServer(handleRequest);

function handleRequest(req, res) {
  let { headers, method, url } = req

  console.log(chalk.bgBlue.black(`\n Incoming ${req.method} Request -- URL: ${req.url} `));

  console.log(headers);
    
  res.writeHead(200);
  res.write(`<html>\n<body>\n<h1>${req.method}</h1>\n</body>\n</html>`)
  res.end();
  console.log(chalk.bgGreen.black(` Outgoing Request -- STATUS: 200 `));
}

nodeServer.listen(8192, () => {
  console.clear();
  console.log(chalk.bgGreenBright.black(" Server running. Listening on port 8192 "));
});