## Um bot totalmente em JavaScript.

Fiz este bot visando quem quer se aprofundar mais em [discord.js](https://discord.js.org/#/) e JavaScript. Combinei as melhores práticas do JavaScript para criar um bot simples e funcional que possui funções como Command Handlers e Event Handlers!

## Instalação

Após ter clonado o repositório e extraído todos os arquivos, tenha certeza que possui o [node.js](https://nodejs.org/en/)(versão mais recente) e o [npm](https://www.npmjs.com/). Caso esteja com tudo pronto, execute o seguinte comando no diretorio dos arquivos:

```sh
$ npm install
ou
$ yarn
```

Se estiver tudo certo, crie um arquivo com o nome de **.env** seguindo o exemplo do **.env.example** com o seguinte comando:

- Windows

```sh
$ copy .env.example .env
```

- Linux 

```sh
$ cp .env.example .env
```

| Opção             | Descrição                           | Obrigatório? |
| ----------------- | ----------------------------------- | ------------ |
| TOKEN             | Token de autenticação do seu bot    | sim          |
| EMBED_COLOR       | Cor de todas as embeds              | sim          |
| DATABASE_CONNECT  | Link de conexão da database MongoDB | sim          |

Feito isso, você poderá iniciar seu bot utilizando o seguinte comando:

```sh
$ npm start
ou
$ yarn start
```

## Contribuições

Aceito contribuições desde que tenham algum sentido e não sejam gambiarra. Se quiser começar a participar de bots open-source como este, entre em contato comigo no Discord.

## Ajuda

Caso tenha alguma dificuldade em entender este código ou por onde começar, me contate diretamente em meu Discord.
