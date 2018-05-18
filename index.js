"use strict";

const fs = require("fs");
const path = require("path");
const http = require("http");
const chalk = require("chalk");

const nodeServer = http.createServer(handleRequest);

function handleRequest(req, res) {
  console.log(chalk.bgBlue.black(`\n Incoming ${req.method} Request -- URL: ${req.url} `));
  // console.log(req.url);
  
  res.writeHead(200);
  res.end();
}

nodeServer.listen(8192, () => {
  console.clear();
  console.log(chalk.bgGreenBright.black(" Server running. Listening on port 8192 "));
});