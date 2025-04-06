const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();
const port = process.env.PORT || 3000;

// Middleware para JSON
app.use(bodyParser.json());

// Rota POST principal
app.post("/", async (req, res) => {
  const userMessage = req.body.message;

  if (!userMessage) {
    return res.status(400).json({ error: "Mensagem do usuário ausente." });
  }

  try {
    const openaiResponse = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "user",
            content: userMessage,
          },
        ],
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
      }
    );

    const reply = openaiResponse.data.choices[0].message.content;
    res.json({ reply });
  } catch (error) {
    console.error("Erro ao chamar OpenAI:", error.response?.data || error.message);
    res.status(500).json({ error: "Erro interno na IA" });
  }
});

// Rota GET para teste simples
app.get("/", (req, res) => {
  res.send("Servidor ativo. Use POST / com { message } no corpo para interagir.");
});

// Inicia o servidor
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
