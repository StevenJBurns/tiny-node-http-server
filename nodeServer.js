//#region Node Dependencies
const path = require("path");
const http = require("http");
const https = require("https");
//#endregion

//#region External Dependencies
const dotenv = require('dotenv');
//#endregion

//#region Local Dependencies
const handleRequest = require("./handleRequest.js");
const handleListen = require('./handleListen.js');

const cities = require("./data/cities.js");
//#endregion


/* Grab the sensitive variables from .dotenv file */
dotenv.config();

const nodeServer = http.createServer(handleRequest);

nodeServer.on("close", () => console.clear());

/* Start The Server */
nodeServer.listen(process.env.PORT_HTTP, handleListen);