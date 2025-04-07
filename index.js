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

  // 🔧 Salesbot espera resposta nesse formato específico:
  res.json({
    data: {
      response: {
        resposta_nome: nomeAleatorio
      }
    }
  });
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
