# Blog API RESTFUL

## Descrição

Bem-vindo à documentação da API de Blog! Esta API foi construída utilizando Node.js e MongoDB como banco de dados. Ela permite a criação, leitura, atualização e exclusão de blogs (CRUD), fornecendo endpoints seguros e otimizados para aplicações front-end.

#### Requisitos:

- Node.js: v20 ou superior
- Yarn
- MongoDB

## Índice

- [Blog API RESTFUL](#blog-api-restful)
  - [Descrição](#descrição)
    - [Requisitos:](#requisitos)
  - [Índice](#índice)
  - [Pré-requisitos](#pré-requisitos)
  - [Instalação](#instalação)
  - [Configuração](#configuração)
  - [Endpoints](#endpoints)
    - [Rota para as exibir as imagens](#rota-para-as-exibir-as-imagens)
    - [Rota do usuário](#rota-do-usuário)
    - [Rota do Post](#rota-do-post)
  - [Pacotes Utilizados](#pacotes-utilizados)
  - [Boas Práticas](#boas-práticas)
  - [Contribuição](#contribuição)
    - [Autor:](#autor)
    - [Licença:](#licença)

## Pré-requisitos

Certifique-se de ter instalado:

- Node.js v20 ou superior:

  Verifique com:

  ```bash
  node --version
  ```

  Instale ou atualize pelo site oficial: https://nodejs.org.

- MongoDB:

  Configure e inicie uma instância do [MongoDB localmente](https://www.mongodb.com/products/tools/compass) ou use uma solução em nuvem como o [MongoDB Atlas](https://www.mongodb.com/products/platform/atlas-database).

- Yarn (Gerenciador de pacotes):

  Verifique se o Yarn está instalado com:

  ```bash
  yarn --version
  ```

  Caso não tenha, instale via npm:

  ```bash
  npm install -g yarn
  ```

## Instalação

1. Clone o repositório:

   ```bash
   git clone https://github.com/DevVittor/Blog.git
   cd Blog
   ```

2. Instale as dependências:

   ```bash
   yarn install
   ```

3. Verifique as dependências instaladas:

   ```bash
   yarn list
   ```

## Configuração

1.  Configure as variáveis de ambiente:

    Crie um arquivo `.env` na raiz do projeto com os seguintes campos:

    ```bash
    PORT=3000
    PORT_ALTERNATIVE=8080
    FRONT_URL=http://localhost:5173
    JWT_SECRET=****
    MONGO_URL=mongodb://127.0.0.1:27017/
    MONGO_NAME=Blog
    USERNAME_ADMIN=Admin
    EMAIL_ADMIN=****
    PASSWORD_ADMIN=****
    ```

    > Ou copie do arquivo `.env.example` e cole no arquivo `.env` que foi criado.

    - `PORT`: Porta principal onde o servidor será executado.
    - `PORT_ALTERNATIVE`: Porta secundária caso a principal não esteja disponível
    - `FRONT_URL`: Url padrão do seu front-end.
    - `MONGO_URL`: URL de conexão com o MongoDB.
    - `JWT_SECRET`: Chave secreta para geração de tokens JWT(json web token).
    - `MONGO_URL`: A url local é a padrão ou coloque a url do mongo Atlas.
    - `MONGO_NAME`: Nome do banco de dados no mongoDB.
    - `USERNAME_ADMIN`: Coloque o nome que o admin vai ficar salvo como padrão vai ficar o nome Admin.
    - `EMAIL_ADMIN`: Escolha qual email quer usar no admin.
    - `PASSWORD_ADMIN`: Escolha uma senha que desejar.

2.  Inicie o servidor:

    > Produção

    ```bash
    yarn start
    ```

    ou

    > Desenvolvimento

    ```bash
    yarn dev
    ```

    O servidor estará acessível em: `http://localhost:3000/api/v1`.

## Endpoints

### Rota para as exibir as imagens

1. Imagem do usuário

- GET `/api/v1/avatar` + `Nome da imagem`

2. Imagens do post

- GET `/api/v1/photos` + `Nome da imagem`

**Ex:** `http://localhost:3000/api/v1/avatar/imagem1` | `http://localhost:3000/api/v1/photos/imagem1`

### Rota do usuário

1. Registrar Usuário

   - POST `/user/register`
   - Body:
     ```json
     {
       "avatar": "photo_avatar.jpg",
       "username": "Nome",
       "email": "seu.email@example.com",
       "password": "senha-segura"
     }
     ```

2. Login

   - POST `/user/login`
   - Body:
     ```json
     {
       "email": "Email cadastrado",
       "password": "Senha cadastrada"
     }
     ```
   - Resposta:

     ```json
     {
       "msg":"Login Done"
       "token": "jwt_token_gerado"
     }
     ```

   > O Cookie será salvo com o nome `access_token` com expiração de 7 dias.
   >
   > Você pode verificar o cookie no navegador em:
   >
   > Chrome/Edge/Brave:
   > Abra as DevTools (F12) > Aba Application > Seção Storage > Cookies.
   > Selecione o domínio do servidor para visualizar o cookie `access_token`.
   >
   > Firefox:
   >
   > DevTools (F12) > Aba Storage > Cookies.

### Rota do Post

1. Exibir todos os Posts

- GET `/api/v1/post/all`

Essa rota vai mostrar todas os posts que foram criados.

Você vai receber esses detalhes de cada post:

`photos _id author title content categories commentaryId blocked createdAt updatedAt`

2. Detalhe de um Post individual

   - GET `/api/v1/post/all`

   Motra detalhes do post para a criação da página que mostra todos os detalhes do post

3. Criar Post

   - POST `/api/v1/post/create`

   - Query: `http://localhost:3000/api/v1/post/create?userId`

   - Body:

     ```json
     {
       "photos": "Fotos do post", //Opcional
       "title": "Título do Blog",
       "content": "Conteúdo do blog",
       "categories": ["tecnologia", "jogos"]
     }
     ```

     Obs: O limite é 3 imagens por post

     - Lembrando que a categoria tem que ter pelo menos 1 categoria e o máximo 3, e tem que ser uma dessas:

       `["tecnologia", "economia", "esporte", "novela", "jogos"]`

       As imagens vão ficar salvas na rota `src/upload/post/` com o nome do author no formato `.webp` com 600px de largura e com 80% de qualidade, isso tudo para ter o máximo de qualidade possível sem perder qualidade.

4. Bloquear o Post

   **Apenas usuário do tipo admin podem bloquear um post**

   - POST `/api/v1/post/block`

   - Query: `http://localhost:3000/api/v1/post/block?userId&postId`

   `userId` | `_id do usuário`

   `postId` | `_id do post`

   - Body:

     ```json
     {
       "reason": "Digite o motivo do bloqueio desse post."
     }
     ```

     `reason` | O `reason` é o motivo do bloqueio do post

   Você pode bloquear o post de qualquer usuário tanto que você envie no meio de query um `_id` de um usuário `admin` e o motivo do bloqueio do post.

   ```

   ```

5. Desbloquear o Post

   **Apenas usuário do tipo admin podem bloquear um post**

   - POST `/api/v1/post/block`

   - Query: `http://localhost:3000/api/v1/block?userId&postId`

   `userId` | `_id do usuário`

   `postId` | `_id do post`

   - Body:

   ```json
   {
     "reason": "Digite o motivo do desbloquei desse post."
   }
   ```

   `reason` | O `reason` é o motivo do bloqueio do post

   Você pode bloquear o post de qualquer usuário tanto que você envie no meio de query um `_id` de um usuário `admin` e o motivo do bloqueio do post.

6. Alterar o título do post

   - PATCH `/api/v1/post/alter/title`
   - Query:

     ```json
     {
       "userId": "_id do usuário",
       "postId": "_id do post"
     }
     ```

   - Body:

     ```json
     {
       "newTitle": "Título atualizado"
     }
     ```

     **Obs: Apenas o usuário que criou o post poderá fazer a alteração no título do post.**

7. Alterar o conteúdo do Post

- PATCH `/api/v1/post/alter/content`

  -Query:

  `userId` | `_id do usuário`

  `postId` | `_id do post`

  -Body:

  `content` | Digite um conteúdo diferente do post atual com no mínimo 30 caracteres e no máximo 500.

7. Excluir Post

   - DELETE `/api/v1/post/delete`

- Query:

  `userId` | `_id do usuário`

  `postId` | `_id do post`

## Pacotes Utilizados

- [bcryptjs](https://classic.yarnpkg.com/en/package/bcryptjs): Hash de senhas.
- [compression](https://classic.yarnpkg.com/en/package/compression): Compactação de respostas HTTP.
- [cookie-parser](https://classic.yarnpkg.com/en/package/@tinyhttp/cookie-parser): Manipulação de cookies.
- [cors](https://classic.yarnpkg.com/en/package/cors): Controle de acesso entre domínios.
- [dotenv](https://classic.yarnpkg.com/en/package/dotenv): Gerenciamento de variáveis de ambiente.
- [express](https://classic.yarnpkg.com/en/package/express): Framework para criação de servidores.
- [express-validator](https://classic.yarnpkg.com/en/package/express-validation): Validação de requisições.
- [jsonwebtoken](https://classic.yarnpkg.com/en/package/jsonwebtoken): Geração e validação de tokens JWT.
- [mongoose](https://classic.yarnpkg.com/en/package/mongoose): Modelagem de dados para MongoDB.
- [multer](https://classic.yarnpkg.com/en/package/multer): Upload de arquivos.
- [sharp](https://classic.yarnpkg.com/en/package/sharp): Manipulação de imagens.
- [morgan](https://classic.yarnpkg.com/en/package/morgan): Logger para monitoramento.

## Boas Práticas

- Segurança:

  Sempre mantenha seu `JWT_SECRET` seguro e fora do código-fonte.

- Validação de Dados:

  Use `express-validator` para validar entradas e evitar inconsistências no banco.

- Logs:

  Utilize `winston` para registrar logs em produção.

## Contribuição

Sinta-se à vontade para contribuir:

1. Fork o repositório.
2. Crie uma nova branch: `git checkout -b minha-feature`.
3. Faça suas alterações e commit: `git commit -m "Minha nova feature"`.
4. Envie sua branch: `git push origin minha-feature`.
5. Abra um pull request.

#### Autor:

Vittor F. Serra

#### Licença:

Este projeto está licenciado sob a MIT License.
