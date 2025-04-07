const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 10000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const nomes = ['Rogério', 'Lucas', 'Edna'];

app.post('/', (req, res) => {
  const body = req.body;

  console.log('== Webhook recebido da Kommo ==');
  console.log('Headers:', req.headers);
  console.log('Body:', body);

  // Sorteia nome aleatório
  const nomeAleatorio = nomes[Math.floor(Math.random() * nomes.length)];

  // Retorna estrutura compatível com etapa adaptada do Salesbot
  res.json({
    handler: "random_nome",
    data: {
      resposta_nome: nomeAleatorio
    },
    execute_handlers: [
      {
        handler: "show",
        params: {
          type: "text",
          value: "{{resposta_nome}}, tudo bem? Em que posso ajudar?"
        }
      }
    ]
  });
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
