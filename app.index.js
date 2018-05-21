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
    case "/favicon.ico" :
      break;
    case "/css/style.css" :
      break;
    default :
      console.log(chalk.bgRed.black(` Outgoing Request -- STATUS: 404 `));
      res.statusCode = 404;
      res.write("Not Found");
      res.end();
      break;
  }
};

//   switch (req.method) {
//     case "HEAD" :
//       break;
//     case "GET" :
//       let auth64, password, message;

//       if (req.url == "/admin" && !headers["authorization"]) {
//         res.statusCode = 401;
//         res.setHeader("WWW-Authenticate", "Basic realm='Admin Access', charset='UTF-8'");
//         res.end();
//       } else if (req.url == "/admin" && headers["authorization"]) {
//         auth64 = req.headers["authorization"].split(" ");

//         let buff = Buffer.from(auth64[1], 'base64');
//         let auth = buff.toString();

//         auth = auth.split(":");
//         password = auth[1]

//         if (password == process.env.BASIC_AUTH_PASSWORD) {
//           console.log(chalk.bgGreen.black(` Outgoing Request -- STATUS: 200 `));
//           ejs.renderFile(`${__dirname}/views/index.ejs`, { title: "Home"}, (err, str) => {
//             res.writeHead(200, {"content-type": "text/html"});
//             res.write(str);
//             res.end();
//           });
//           // console.log(`${__dirname}/views/index.ejs`);
//           // res.end();
//         } else {
//           console.log(chalk.bgRed.black(` Outgoing Request -- STATUS: 401 `));
//           res.statusCode = 401;
//           res.setHeader("WWW-Authenticate", "Basic realm='Admin Access', charset='UTF-8'");
//           res.write("<meta charset='utf-8'>\n<h1 style='color: red'>BAD PASSWORD</h1>");
//           res.end();
//         };
//       }

//       break;
//     case "POST" :
//       break;
//     case "PATCH" :
//       break;
//     case "PUT" :
//       break;
//     case "DELETE" :
//       break;
//     default :
//       console.log(`${req.method} received`);
//       break;
//   }
//   res.end();

nodeServer.listen(process.env.SERVER_PORT, () => {
  console.clear();
  console.log(chalk.inverse(` Server running. Listening on port ${process.env.SERVER_PORT} `));
})