const fs = require("fs");
const path = require("path");

const logDir = path.join(__dirname, "../logs");

if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir, { recursive: true });
}

const logFile = path.join(logDir, "server.log");

function write(type, message) {

    const time = new Date().toISOString();

    const line = `[${time}] [${type}] ${message}\n`;

    console.log(line);

    fs.appendFileSync(logFile, line);

}

function info(message) {

    write("INFO", message);

}

function warn(message) {

    write("WARN", message);

}

function error(message) {

    write("ERROR", message);

}

module.exports = {

    info,

    warn,

    error

};
