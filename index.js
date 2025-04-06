const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.post("/", (req, res) => {
  console.log("Webhook recebido:", req.body); // Isso vai aparecer no Render
  res.send("Webhook recebido com sucesso!");
});

app.get("/", (req, res) => {
  res.send("Servidor do webhook está online!");
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
