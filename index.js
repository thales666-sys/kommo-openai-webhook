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

  // Checa se é uma chamada de etapa adaptada do Salesbot
  if (body.handler === 'random_nome') {
    const nomeAleatorio = nomes[Math.floor(Math.random() * nomes.length)];
    return res.json({
      result: {
        resposta_nome: nomeAleatorio
      }
    });
  }

  // Caso não seja uma chamada de Salesbot, apenas envia uma resposta padrão
  const nomeAleatorio = nomes[Math.floor(Math.random() * nomes.length)];
  const resposta = `${nomeAleatorio}, tudo bem? Em que posso ajudar?`;
  console.log('Resposta enviada:', resposta);
  res.send(resposta);
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
