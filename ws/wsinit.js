const chalk = require("chalk");
const ws = require("ws");
require('better-logging')(console, {
    format: ctx => `${ctx.time12} ${ctx.STAMP('websocket', chalk.blue)} ${ctx.msg}`,
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
async function connected(options) {
    if(options === "pass") {
        console.warn("Ignoring hello timeout. Gateway will disconnect soon!")
    }
    console.log("Connected to gulided! Running GATEWAY_HELLO")
}
function kill(code, reason) {
   console.error("Lost connection with gulided! Code: " + code + " Gateway gave reason: " + reason)
    throw new Error("Connection lost!")
}
function pinghandler(timeout) {

}
module.exports.runinit = function (cookie, options) {
    if(options === "1ping") {
        console.warn("1 Ping was speficed in the .runinit() for websocket. We will wait for hello and then disconnect.")
        this.websocketconnection = new ws(
            `wss://api.guilded.gg/socket.io/?jwt=undefined&EIO=3&transport=websocket`,
            {
                headers: {
                    "Content-Type": "application/json",
                    Cookie: cookie,
                },
            }
        );
        this.websocketconnection
            .on("open",  () => connected())
            .on("close", (code, reason) => kill(code, reason))
            .on("message", () => handler() )
    }
    console.warn("1 Ping was speficed in the .runinit() for websocket. We will wait for hello and then disconnect.")
    this.websocketconnection = new ws(
        `wss://api.guilded.gg/socket.io/?jwt=undefined&EIO=3&transport=websocket`,
        {
            headers: {
                "Content-Type": "application/json",
                Cookie: cookie,
            },
        }
    );
    this.websocketconnection
        .on("open",  () => connected())
        .on("close", (code, reason) => kill(code, reason))
        .on("message", () => handler() )
}