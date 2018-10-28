const chalk = require("chalk");
const mimeTypes = require("./data/mimetypes");


const handleListen = () => {
  console.clear();
  console.log(chalk.inverse(` Server running. Listening on port ${process.env.PORT_HTTP} `));
};

module.exports = handleListen;