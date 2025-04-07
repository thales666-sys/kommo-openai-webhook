const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const PORT = process.env.PORT || 10000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const nomes = ["Rogério", "Lucas", "Edna"];
const fraseBase = ", tudo bem? Em que posso ajudar?";

app.post("/", (req, res) => {
  console.log("== Webhook recebido da Kommo ==");
  console.log("Headers:", req.headers);
  console.log("Body:", req.body);

  const nomeAleatorio = nomes[Math.floor(Math.random() * nomes.length)];
  const mensagem = `${nomeAleatorio}${fraseBase}`;

  console.log("Resposta enviada:", mensagem);

  // Envia a resposta como JSON para que o Salesbot entenda
  res.send(`${nome}, tudo bem? Em que posso ajudar?`)
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
