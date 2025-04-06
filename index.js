const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.post("/", (req, res) => {
  console.log("✅ Webhook recebido com sucesso!");
  console.log(req.body); // Mostra o conteúdo do webhook recebido
  res.status(200).send("OK");
});

app.get("/", (req, res) => {
  res.send("Servidor do Webhook está online!");
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});