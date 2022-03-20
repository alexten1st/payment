const http = require("http");
const app = require("./app");
const connect = require("./db/connect")
const server = http.createServer(app);
const PORT = process.env.PORT || 4000
connect()
server.listen(PORT, ()=> console.log("Server is running"))