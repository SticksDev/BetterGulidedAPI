const email = ""
const password = ""
const axios = require('axios').default;
const chalk = require("chalk");
const websocket = require("../ws/websocket");
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
                const cookie = response.headers["set-cookie"]
                    .map((cookie) => cookie.split(" ")[0])
                    .join("");
                websocket.bind(cookie, "1ping")

            }
        })
        .catch(function (error) {
            console.error(error + ". Check your login!")
            throw new Error("Halted due to login error.")
        });
}