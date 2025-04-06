const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post("/", async (req, res) => {
  try {
    const nomes = ["Rogério", "Lucas", "Edna"];
    const nomeAleatorio = nomes[Math.floor(Math.random() * nomes.length)];

    const frase = `${nomeAleatorio}, tudo bem? Em que posso ajudar?`;

    console.log("== Webhook recebido da Kommo ==");
    console.log("Headers:", req.headers);
    console.log("Body:", req.body);
    console.log("Resposta enviada:", frase);

    res.send(frase);
  } catch (error) {
    console.error("Erro ao processar webhook:", error.message);
    res.status(500).send("Erro ao processar o webhook.");
  }
});

app.get("/", (req, res) => {
  res.send("Servidor do webhook está online!");
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
