"use strict";

const fs = require("fs");
const path = require("path");
const http = require("http");
const chalk = require("chalk");

require('dotenv').config();

const nodeServer = http.createServer(handleRequest);

function handleRequest(req, res) {
  let { headers, method, url } = req

  console.log(chalk.bgBlue.black(`\n Incoming ${req.method} Request -- URL: ${req.url} `));
  
  // res.writeHead(200);
  // res.write(`<html>\n<body>\n<h1>${req.method}</h1>\n</body>\n</html>`)
  // res.end();
  // console.log(chalk.bgGreen.black(` Outgoing Request -- STATUS: 200 `));

  // console.log(headers["authorization"]);
  // console.log(req.url);

  switch (req.method) {
    case "HEAD" :
      break;
    case "GET" :
      let auth64, password, message;

      if (req.url == "/admin" && !headers["authorization"]) {
        res.statusCode = 401;
        res.setHeader("WWW-Authenticate", "Basic realm='Admin Access', charset='UTF-8'");
        res.end();
      } else if (req.url == "/admin" && headers["authorization"]) {
        auth64 = req.headers["authorization"].split(" ");

        let buf = Buffer.from(auth64[1], 'base64');
        let auth = buf.toString();

        auth = auth.split(":");
        password = auth[1]

        if (password == process.env.BASIC_AUTH_PASSWORD) {
          console.log(chalk.bgGreen.black(` Outgoing Request -- STATUS: 200 `));
          res.writeHead(200);
          res.write("<meta charset='utf-8'>\n<h1>AUTHORIZED</h1>");
          res.end();
        } else {
          console.log(chalk.bgRed.black(` Outgoing Request -- STATUS: 401 `));
          res.statusCode = 401;
          res.setHeader("WWW-Authenticate", "Basic realm='Admin Access', charset='UTF-8'");
          res.write("<meta charset='utf-8'>\n<h1 style='color: red'>BAD PASSWORD</h1>");
          res.end();
        };
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

nodeServer.listen(process.env.SERVER_PORT, () => {
  console.clear();
  console.log(chalk.inverse(` Server running. Listening on port ${process.env.SERVER_PORT} `));
});