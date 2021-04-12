let interval;
let connection;

interval = new Set();

constructor() {
    this.connection = connection;
    this.interval = interval;
}

/**
 *
 * @param {import("./wsinit").runinit} connection
 */
function init(interval) {
    this.interval = interval;
    const inv = setInterval(() => this.send(), this.interval ?? 10000)
    this.interval.add(inv)
}
function send(interval) {
    this.SentAt = new Date().now;
    this.connection.send("2")
    this.connection.client.rest.request("put", "/users/me/ping")
}
function kill() {
    this.interval.delete(this.interval)
    this.interval = null
}