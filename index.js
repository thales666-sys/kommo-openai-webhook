const express = require('express');
const axios = require('axios');
const app = express();

app.use(express.json());

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

app.post('/webhook', async (req, res) => {
  try {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-4',
        messages: [
          {
            role: 'system',
            content: 'Escolha aleatoriamente entre os nomes Rogerio, Carla e Lucas, e retorne a frase: "Meu nome é [nome escolhido] e vou te atender hoje." Apenas isso. Não adicione mais nada.'
          },
          {
            role: 'user',
            content: 'Gere a frase.'
          }
        ],
        temperature: 1
      },
      {
        headers: {
          Authorization: `Bearer ${OPENAI_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    const frase = response.data.choices[0].message.content;

    res.json({
      execute_handlers: [
        {
          handler: 'show',
          params: {
            type: 'text',
            value: frase
          }
        }
      ]
    });
  } catch (error) {
    console.error('Erro ao chamar OpenAI:', error.response?.data || error.message);
    res.status(500).json({
      execute_handlers: [
        {
          handler: 'show',
          params: {
            type: 'text',
            value: 'Desculpe, houve um erro ao gerar a resposta.'
          }
        }
      ]
    });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
