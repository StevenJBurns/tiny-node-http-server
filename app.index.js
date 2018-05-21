"use strict";

const fs = require("fs");
const path = require("path");
const http = require("http");
const chalk = require("chalk");
const ejs = require("ejs");

const cities = require("./app.data");

require('dotenv').config();

const nodeServer = http.createServer(handleRequest);

function handleRequest(req, res) {
  let { url, headers, method } = req;

  console.log(url);
  console.log(chalk.bgBlue.black(`\n Incoming ${req.method} Request -- URL: ${req.url} `));

  switch (url) {
    case "/" :
      console.log(chalk.bgGreen.black(` Outgoing Request -- STATUS: 200 `));

      ejs.renderFile(`${__dirname}/views/index.ejs`, { title: "Home" }, (err, str) => {
        res.writeHead(200, {"content-type": "text/html"});
        res.write(str);
        res.end();
      });
      break;

    case "/admin" :
      if (!headers["authorization"]) {
        res.statusCode = 401;
        res.setHeader("WWW-Authenticate", "Basic realm='Admin Access', charset='UTF-8'");
        res.end();
      } else {
        let auth, auth64, password;

        auth64 = headers["authorization"].split(" ");
        auth = Buffer.from(auth64[1], 'base64').toString();
        auth = auth.split(":");
        console.log(auth[1]);
        
        if (auth[1] == process.env.BASIC_AUTH_PASSWORD) {
          ejs.renderFile(`${__dirname}/views/admin.ejs`, { title: "Admin" }, (err, str) => {
            res.writeHead(200, {"content-type": "text/html"});
            res.write(str);
            res.end();
          });
        } else {
          res.statusCode = 401;
          res.setHeader("WWW-Authenticate", "Basic realm='Admin Access', charset='UTF-8'");
          res.end();
        }
      }
      break;
    case "/favicon-16x16.png" :
      fs.readFile(`${__dirname}/public/favicon/favicon-16x16.png`, (err, favicon16) => {
        res.writeHead(200, {"Content-Type": "img/png"});
        res.write(favicon16);
        res.end();
      });
      break;
    case "/favicon-32x32.png" :
      fs.readFile(`${__dirname}/public/favicon/favicon-32x32.png`, (err, favicon32) => {
        res.writeHead(200, {"Content-Type": "img/png"});
        res.write(favicon32);
        res.end();
      });
      break;
    case "/css/style.css" :
      fs.readFile(`${__dirname}/public/css/style.css`, (err, cssFile) => {
        res.writeHead(200, {"Content-Type": "text/css"});
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
})