const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = process.env.PORT || 3000;

// Middleware para aceitar JSON e x-www-form-urlencoded
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/", async (req, res) => {
  console.log("=== Webhook recebido da Kommo ===");

  // Exibe os headers e o corpo da requisição para debug
  console.log("Headers:", JSON.stringify(req.headers, null, 2));
  console.log("Body:", JSON.stringify(req.body, null, 2));

  res.send("Webhook recebido com sucesso da Kommo!");
});

app.get("/", (req, res) => {
  res.send("Servidor do webhook está online!");
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
