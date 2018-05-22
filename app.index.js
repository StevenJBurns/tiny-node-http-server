"use strict";

const fs = require("fs");
const path = require("path");
const http = require("http");
const https = require("https");
const crypto = require("crypto");
const chalk = require("chalk");
const ejs = require("ejs");

const cities = require("./app.data");
const pathPublic = `${__dirname}/public`;

require('dotenv').config();

const nodeServer = http.createServer(handleRequest);

function handleRequest(req, res) {
  let { url, headers, method } = req;

  console.log(chalk.bgBlue.black(`\n Incoming ${req.method} Request -- URL: ${req.url} `));

  switch (url) {
    case "/" :
      console.log(chalk.bgGreen.black(` Outgoing Request -- STATUS: 200 `));

      ejs.renderFile(`${__dirname}/views/index.ejs`, { title: "Home" }, (err, str) => {
        res.writeHead(200, {"content-type": "text/html; ; charset=utf-8"});
        res.write(str);
        res.end();
      });
      break;

    case "/admin-basic-auth" :
      if (!headers["authorization"]) {
        res.statusCode = 401;
        res.setHeader("WWW-Authenticate", "Basic realm='Admin Logn via Basic Auth', charset='UTF-8'");
        res.end();
      } else {
        let auth, auth64, password;

        auth64 = headers["authorization"].split(" ");
        auth = Buffer.from(auth64[1], 'base64').toString();
        auth = auth.split(":");
        
        if (auth[1] == process.env.BASIC_AUTH_PASSWORD) {
          ejs.renderFile(`${__dirname}/views/admin-basic-auth.ejs`, { title: "Admin" }, (err, str) => {
            res.writeHead(200, {"content-type": "text/html; charset=utf-8"});
            res.write(str);
            res.end();
          });
        } else {
          console.log(chalk.bgRed.black(` Outgoing Request -- STATUS: 401 `));
          res.statusCode = 401;
          res.setHeader("WWW-Authenticate", "Basic realm='Admin Logn via Basic Auth', charset='UTF-8'");
          res.end();
        }
      }
      break;
    case "/admin-disgest-auth" :
      break;
    case "/favicon-16x16.png" :
      console.log(chalk.bgGreen.black(` Outgoing Request -- STATUS: 200 `));

      fs.readFile(`${__dirname}/public/favicon/favicon-16x16.png`, (err, favicon16) => {
        res.writeHead(200, {"Content-Type": "img/png"});
        res.write(favicon16);
        res.end();
      });
      break;
    case "/favicon-32x32.png" :
      console.log(chalk.bgGreen.black(` Outgoing Request -- STATUS: 200 `));

      fs.readFile(`${__dirname}/public/favicon/favicon-32x32.png`, (err, favicon32) => {
        res.writeHead(200, {"Content-Type": "img/png"});
        res.write(favicon32);
        res.end();
      });
      break;
    case "/css/style.css" :
      console.log(chalk.bgGreen.black(` Outgoing Request -- STATUS: 200 `));

      fs.readFile(`${__dirname}/public/css/style.css`, (err, cssFile) => {
        res.writeHead(200, {"Content-Type": "text/css; charset=utf-8"});
        res.write(cssFile);
        res.end();
      });
      break;
    default :
      console.log(chalk.bgRed.black(` Outgoing Request -- STATUS: 404 `));
      res.statusCode = 404;
      res.write("Not Found");
      res.end();
      break;
  }
};

nodeServer.listen(process.env.SERVER_PORT, () => {
  console.clear();
  console.log(chalk.inverse(` Server running. Listening on port ${process.env.SERVER_PORT} `));
  console.log(chalk.inverse(` Public Folder : ${pathPublic} `));

})