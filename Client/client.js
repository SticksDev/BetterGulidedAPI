const email = ""
const password = ""
const axios = require('axios').default;
const chalk = require("chalk");
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
module.exports.login = function (email, password) {
    console.info("CLIENT_LOGIN Called.")
    if (!email) {
        console.error("Please enter an email address by passing email to clientLogin.")
        console.warn("API Could not start. Halting..")
        throw new Error("No email provided.")
    }
    if(!password) {
        console.error("Please enter an password by passing password to clientLogin.")
        console.warn("API Could not start. Halting..")
        throw new Error("No password provided.")
    }
    console.info("Attempting to login.")
    axios.post('https://www.guilded.gg/api/login', {
        email: email,
        password: password
    })
        .then(function (response) {
            if(response.status === 200) {
                console.info("Successfully logged in! (Non WebSocket)")
                console.log("Attempting to bind to websocket.")
            }
        })
        .catch(function (error) {
            console.error(error + ". Check your login!")
            throw new Error("Halted due to login error.")
        });
}