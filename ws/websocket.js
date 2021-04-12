const axios = require('axios').default;
const chalk = require("chalk");
const init = require("./wsinit");
require('better-logging')(console, {
    color: {
        base: chalk.greenBright,
        type: {
            debug: chalk.blue,
            info: chalk.green,
            log: chalk.blue,
            error: chalk.red,
            warn: chalk.yellow,
        }
    },
});

module.exports.bind = function (cookie, options) {
    init.runinit(cookie, options)
}

module.exports.unbind = function () {

}