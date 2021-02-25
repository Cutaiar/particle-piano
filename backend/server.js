const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

// Based on: https://www.digitalocean.com/community/tutorials/nodejs-server-sent-events-build-realtime-app

// If this were ts
// interface note {
//     index: Number;
// }

const app = express();

// Middleware for GET /events endpoint
function eventsHandler(req, res, next) {
  // Mandatory headers and http status to keep connection open
  const headers = {
    "Content-Type": "text/event-stream",
    Connection: "keep-alive",
    "Cache-Control": "no-cache",
  };
  res.writeHead(200, headers);

  // Generate an id based on timestamp and save res
  // object of client connection on clients list
  // Later we'll iterate it and send updates to each client
  const clientId = Date.now();
  const newClient = {
    id: clientId,
    res,
  };
  clients.push(newClient);

  // When client closes connection we update the clients list
  // avoiding the disconnected one
  req.on("close", () => {
    console.log(`${clientId} Connection closed`);
    clients = clients.filter((c) => c.id !== clientId);
  });
}

// Iterate clients list and use write res object method to send new nest
function sendEventsToAll(note) {
  clients.forEach((c) => c.res.write(`data: ${JSON.stringify(note)}\n\n`));
}

// Middleware for POST /note endpoint
async function notePressed(req, res, next) {
  console.log("request received:");
  console.log(req.body);
  const index = req.body.data;
  // Send recently added nest as POST result
  const note = { index: index };
  res.json(note);
  // Invoke iterate and send function
  return sendEventsToAll(note);
}

// Set cors and bodyParser middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Define endpoints
app.post("/note", notePressed);
app.get("/events", eventsHandler);
app.get("/status", (req, res) => res.json({ clients: clients.length }));

const PORT = process.env.PORT || 3001;
let clients = [];

app.listen(PORT);
