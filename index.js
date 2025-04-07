const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 10000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const nomes = ['Rogério', 'Lucas', 'Edna'];

app.post('/', (req, res) => {
  const nomeAleatorio = nomes[Math.floor(Math.random() * nomes.length)];

  console.log('== Webhook recebido ==');
  console.log('Nome sorteado:', nomeAleatorio);

  const resposta = {
    set_variables: {
      resposta_nome: nomeAleatorio
    },
    messages: [
      {
        text: nomeAleatorio + ", tudo bem? Em que posso ajudar?"
      }
    ]
  };

  console.log(">> RESPOSTA ENVIADA AO KOMMO <<", JSON.stringify(resposta, null, 2));

  res.json(resposta);
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});