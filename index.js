const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Servidor do webhook está online!");
});

app.post("/", async (req, res) => {
  const respostas = [
    "Oi! Tudo bem por aí?",
    "Já já te respondo! 😎",
    "Essa é uma resposta aleatória!",
    "Estou online e funcionando! 🚀",
    "Fala comigo, bebê 👀"
  ];

  const aleatoria = respostas[Math.floor(Math.random() * respostas.length)];
  res.json({ text: aleatoria });
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});