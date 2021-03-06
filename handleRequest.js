//#region Node Dependencies
const fs = require("fs");
const crypto = require("crypto");
//#endregion

//#region External Dependencies
const chalk = require("chalk");
const ejs = require("ejs");
//#endregion

//#region Local Dependencies
const pathPublic = `${__dirname}/public`;
const pathViews = `${__dirname}/views`;
//#endregion


const handleRequest = (req, res) => {
  let { url, headers, method } = req;
  
  console.log(chalk.bgBlue.black(`\n Incoming ${req.method} Request -- URL: ${req.url} `));
  
    switch (url) {
      case "/" :
        console.log(chalk.bgGreen.black(` Outgoing Response -- STATUS: 200 `));
  
        ejs.renderFile(`${pathViews}/index.ejs`, { title: "Home" }, (err, str) => {
          res.writeHead(200, {"content-type": "text/html; ; charset=utf-8"});
          res.write(str);
          res.end();
        });
        break;
  
      case "/admin-basic-auth" :
        if (!headers["authorization"]) {
          ejs.renderFile(`${pathViews}/error401.ejs`, {}, (err, page401) => {
            res.setHeader("WWW-Authenticate", "Basic realm='Admin Logn via Basic Auth', charset='UTF-8'");
            res.writeHead(401, {"content-type": "text/html; charset=utf-8"});
            res.write(page401);
            res.end();
          });
        } else {
          let auth, auth64, password;
  
          auth64 = headers["authorization"].split(" ");
          auth = Buffer.from(auth64[1], 'base64').toString("utf-8");
          auth = auth.split(":");
  
          let hashedPassword = crypto.createHash("md5").update(auth[1]).digest("hex");
          console.log(hashedPassword);
          
          if (auth[1] == process.env.BASIC_AUTH_PASSWORD) {
            console.log(chalk.bgGreen.black(` Outgoing Request -- STATUS: 200 `));
  
            ejs.renderFile(`${pathViews}/admin-basic-auth.ejs`, {}, (err, str) => {
              res.writeHead(200, {"content-type": "text/html; charset=utf-8"});
              res.write(str);
              res.end();
            });
          } else {
            console.log(chalk.bgRed.black(` Outgoing Response -- STATUS: 401 `));
  
            ejs.renderFile(`${pathViews}/error401.ejs`, {}, (err, page401) => {
              res.setHeader("WWW-Authenticate", "Basic realm='Admin Logn via Basic Auth', charset='UTF-8'");
              res.writeHead(401, {"content-type": "text/html; charset=utf-8"});
              res.write(page401);
              res.end();
            });
          }
        }
        break;
      case "/admin-disgest-auth" :
        break;
      case "/favicon-16x16.png" :
        console.log(chalk.bgGreen.black(` Outgoing Response -- STATUS: 200 `));
  
        fs.readFile(`${__dirname}/public/favicon/favicon-16x16.png`, (err, favicon16) => {
          res.writeHead(200, {"Content-Type": "img/png"});
          res.write(favicon16);
          res.end();
        });
        break;
      case "/favicon-32x32.png" :
        console.log(chalk.bgGreen.black(` Outgoing Response -- STATUS: 200 `));
  
        fs.readFile(`${__dirname}/public/favicon/favicon-32x32.png`, (err, favicon32) => {
          res.writeHead(200, {"Content-Type": "img/png"});
          res.write(favicon32);
          res.end();
        });
        break;
      case "/css/style.css" :
        console.log(chalk.bgGreen.black(` Outgoing Response -- STATUS: 200 `));
  
        fs.readFile(`${__dirname}/public/css/style.css`, (err, cssFile) => {
          res.writeHead(200, {"Content-Type": "text/css; charset=utf-8"});
          res.write(cssFile);
          res.end();
        });
        break;
      default :
        console.log(chalk.bgYellow.black(` Outgoing Response -- STATUS: 404 `));
  
        ejs.renderFile(`${__dirname}/views/error404.ejs`, { }, (err, page404) => {
          res.writeHead(404, {"content-type": "text/html; charset=utf-8"});
          res.write(page404);
          res.end();
        });
        break;
    }
  };

  module.exports = handleRequest;