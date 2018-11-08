//#region External Dependencies
const chalk = require("chalk");
//#endregion

//#region Local Dependencies
const mimeTypes = require("./data/mimetypes");
//#endregion


const handleListen = () => {
  console.clear();
  // console.log("HTTP: ", process.env.PORT_HTTP);
  // console.log("HTTPS: ", process.env.PORT_HTTPS);
  console.log(chalk.inverse(` Server running. Listening on port ${process.env.PORT_HTTP} `));
};

module.exports = handleListen;