// const { bsTsMethod } = require("./bsTs/init_bsts");
// const { decoHouse } = require("./decoHouse")
// const ExampleClass = require("./demo2")

import { convertTz } from "./src/timezone";
import { tzOrigin } from "./src/timezone/tzOrigin";
import http from "http";

const hostname = "127.0.0.1";
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/plain");
  res.end("Hello World");
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
  console.log("🚀 index L21-tzOrigin", tzOrigin.length);
  convertTz();
});
