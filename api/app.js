const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.send("API online — sistema redundante com Docker Swarm!");
});

app.get("/info", (req, res) => {
  res.json({
    status: "ok",
    host: process.env.HOSTNAME,
    timestamp: new Date().toISOString(),
  });
});

app.listen(3000, () => console.log("API rodando na porta 3000"));
