# Project TrybeSmith
#### _by [Allyson Belli Bogo](https://www.linkedin.com/in/allysonbogo/)_

## :page_with_curl: Sobre

Este projeto consolida o aprendizado da ferramenta TypeScript por meio da construção de uma API Node Express utilizando variáveis e funções com tipagens TypeScript. O projeto foi desenvolvido utilizando as ferramentas TypeScript, Node, Sequelize e JWT (JSON Web Token) para a criação de uma loja de itens medievais, no formato de uma API RESTful com CRUD completo e banco de dados.

Algumas camadas do modelo MSC (Model, Service e Controller) foram desenvolvidas utilizando o JWT para autenticação de rotas. Além disso, foram desenvolvidos testes para garantir o correto funcionamento da aplicação.


## :man_technologist: Habilidades desenvolvidas

* TypeScript
* Node
* Sequelize
* Construção de uma API CRUD e banco de dados
* Sistema de autenticação utilizando JWT (JSON Web Token)
* Testes unitários e de integração com: Mocha, Chai e Sinon


## 🛠️ Ferramentas Utilizadas

* TypeScript
* Node
* Sequelize
* JWT (JSON Web Token)
* Mocha.js
* Chai.js
* Sinon.js


## ⚙️ Como Executar

> :warning: &nbsp; _É necessário ter o Docker instalado para executar este projeto_

<details>
  <summary> Passo a passo </summary>
  <br>

1. Clone o repositório em uma pasta de preferência

```
git clone git@github.com:allysonbogo/project-trybesmith.git
```

2. Entre na pasta raíz do projeto e instale todas as dependências

```
npm install
```

3. Para rodar o projeto é necessário executar o comando abaixo no diretório raiz do projeto. Isso fará com que os containers docker sejam orquestrados e a aplicação esteja disponível

```
docker-compose up -d
```

4. As dependências do projeto serão instaladas juntamente com o início do container. Após isso, no mesmo terminal em que o container foi orquestrado, digite os comandos abaixo para acessar o bash do container e iniciar o servidor

```
docker exec -it trybesmith_api bash
npm start
```
5. Para iniciar o servidor com live-reload, ao invés de <code>npm start</code> digite o comando abaixo 

```
npm run dev
```
6. Para visualização da interface da API podem ser utilizados o Thunder Client, Postman, Insomnia ou alguma outra ferramenta de sua preferência

7. Para testar o projeto use o seguinte script no terminal em que o container foi orquestrado

```
npm run test:mocha
```
</details>


## 📚 Documentação (endpoints)

### :bust_in_silhouette: Login
<details>
  <summary> Rotas </summary>
  <br>

  | Método | Funcionalidade | URL |
  |---|---|---|
  | `POST` | Realiza o login de uma pessoa usuária cadastrada | `http://localhost:3001/login`

  <details>
    <summary> A estrutura do body da requisição deverá seguir o padrão abaixo: </summary>

  ```
  {
    "username": "string",
    "password": "string"
  }
  ```
  </details>

  <details>
    <summary> A resposta da requisição é a seguinte com <code>status 201</code>: </summary>

  ```
  {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7ImlkIjo1LCJkaXNwbGF5TmFtZSI6InVzdWFyaW8gZGUgdGVzdGUiLCJlbWFpbCI6InRlc3RlQGVtYWlsLmNvbSIsImltYWdlIjoibnVsbCJ9LCJpYXQiOjE2MjAyNDQxODcsImV4cCI6MTYyMDY3NjE4N30.Roc4byj6mYakYqd9LTCozU1hd9k_Vw5IWKGL4hcCVG8"
  }
  ```
  > :warning: &nbsp; _O token acima é fictício, o token verdadeiro é gerado a partir da ferramenta JWT (JSON Web Token), utilizando uma palavra-passe e um payload secretos_
  </details>

  <details>
    <summary> A requisição irá falhar nos seguintes casos: </summary>
    - A rota retorna um erro <code>400</code> <code>{ "message": "\"username\" and \"password\" are required" }</code>, caso a requisição não receba o campo <code>username</code>; <br>
    - A rota retorna um erro <code>400</code> <code>{ "message": "\"username\" and \"password\" are required" }</code>, caso a requisição não receba o campo <code>password</code> com formato válido; <br>
    - A rota retorna um erro <code>401</code> <code>{ "message": "Username or password invalid" }</code>, caso a requisição receba um <code>username</code> que não exista no banco de dados; <br>
    - A rota retorna um erro <code>401</code> <code>{ "message": "Username or password invalid" }</code>, caso a requisição receba um <code>password</code> que não corresponda à senha salva no banco de dados; <br>
  </details>
  <br>
</details>


### :coin: Token
<details>
  <summary> Autenticação </summary>
  <br>

  > :warning: &nbsp; _Após o login de uma pessoa usuária cadastrada, é gerado um <code>token</code> aleatório, o qual será autenticado na rota de cadastro de um novo pedido_

  <details>
    <summary> A requisição irá falhar nos seguintes casos: </summary>
    - É disparado o erro <code>401</code> <code>{ "message": "Token not found" }</code>, ao fazer uma operação sem um token; <br>
    - É disparado o erro <code>401</code> <code>{ "message": "Invalid token" }</code>, ao fazer uma operação com um token expirado ou inválido; <br>
  </details>
</details>


### :package: Products
<details>
  <summary> Rotas </summary>
  <br>

  | Método | Funcionalidade | URL |
  |---|---|---|
  | `POST` | Realiza o cadastro de um produto | `http://localhost:3001/products`

  <details>
    <summary> A estrutura do body da requisição deverá seguir o padrão abaixo: </summary>

  ```
  {
    "name": "Martelo de Thor",
    "price": "30 peças de ouro",
    "orderId": 1
  }
  ```
  > :warning: &nbsp; _Como os produtos são únicos e exclusivos, novos produtos devem receber um orderId ao serem criados, vinculando o produto à uma pessoa específica_
  </details>

  <details>
  <summary> A resposta da requisição é a seguinte com <code>status 201</code>: </summary>
  
  ```
  {
    "id": 1
    "name": "Martelo de Thor",
    "price": "30 peças de ouro",
    "orderId": 1
  }
  ```
  </details>

  <details>
    <summary> A requisição irá falhar nos seguintes casos: </summary>
    - A rota retorna um erro <code>400</code> <code>{ "message": "\"name\" is required" }</code>, caso a requisição não receba o campo <code>name</code>; <br>
    - A rota retorna um erro <code>422</code> <code>{ "message": "\"name\" must be a string" }</code>, caso o campo <code>name</code> não seja do tipo string; <br>
    - A rota retorna um erro <code>422</code> <code>{ "message": "\"name\" length must be at least 3 characters long" }</code>, caso o campo <code>name</code> não tenha pelo menos 3 caracteres; <br>
    - A rota retorna um erro <code>400</code> <code>{ "message": "\"price\" is required" }</code>, caso a requisição não receba o campo <code>price</code>; <br>
    - A rota retorna um erro <code>422</code> <code>{ "message": "\"price\" must be a string" }</code>, caso o campo <code>price</code> não seja do tipo string; <br>
    - A rota retorna um erro <code>422</code> <code>{ "message": "\"price\" length must be at least 3 characters long" }</code>, caso o campo <code>price</code> não tenha pelo menos 3 caracteres; <br>
  </details>
  <br>

  | Método | Funcionalidade | URL |
  |---|---|---|
  | `GET` | Retorna uma lista de produtos cadastrados | `http://localhost:3001/products`

  <details>
    <summary> A resposta da requisição é a seguinte com <code>status 200</code>: </summary>
    
  ```
  [
    {
      "id": 1,
      "name": "Pedra Filosofal",
      "price": "20 gold",
      "orderId": null
    },
    {
      "id": 2,
      "name": "Lança do Destino",
      "price": "100 diamond",
      "orderId": 1
    },
    ...
  ]
  ```
  </details>
  <br>
</details>


### :moneybag: Orders
<details>
  <summary> Rotas </summary>
  <br>

  | Método | Funcionalidade | URL |
  |---|---|---|
  | `GET` | Retorna uma lista de pedidos | `http://localhost:3001/orders`

  <details>
    <summary> A resposta da requisição é a seguinte com <code>status 200</code>: </summary>
    
  ```
  [
    {
      "id": 1,
      "userId": 2,
      "productIds": [1, 2]
    },
    {
      "id": 2,
      "userId": 1,
      "productIds": [3, 4]
    }
    ...
  ]
  ```
  </details>
  <br>

  | Método | Funcionalidade | URL |
  |---|---|---|
  | `POST` | Realiza o cadastro de um pedido | `http://localhost:3001/orders`

  <details>
    <summary> A estrutura do body da requisição deverá seguir o padrão abaixo: </summary>

  ```
  {
    "userId": 1
    "productIds": [1, 2],
  }
  ```
  </details>

  <details>
    <summary> Para o cadastro de um pedido é necessário enviar um token de autenticação, o qual é gerado ao realizar o login. A resposta da requisição é a seguinte com <code>status 201</code>: </summary>

  ```
  {
    "userId": 1,
    "productIds": [1, 2]
  }
  ```
  </details>

  <details>
    <summary> A requisição irá falhar nos seguintes casos: </summary>
    - A rota retorna um erro <code>400</code> <code>{ "message": "\"userId\" is required" }</code>, caso a requisição não receba o campo <code>userId</code>; <br>
    - A rota retorna um erro <code>422</code> <code>{ "message": "\"userId\" must be a number" }</code>, caso o campo <code>userId</code> não seja do tipo number; <br>
    - A rota retorna um erro <code>404</code> <code>{ "message": "\"userId\" not found" }</code>, caso o <code>userId</code> não esteja cadastrado no banco de dados; <br>
    - A rota retorna um erro <code>400</code> <code>{ "message": "\"productIds\" is required" }</code>, caso a requisição não receba o campo <code>productIds</code>; <br>
    - A rota retorna um erro <code>422</code> <code>{ "message": "\"productIds\" must be an array" }</code>, caso o campo <code>productIds</code> não seja do tipo array; <br>
    - A rota retorna um erro <code>422</code> <code>{ "message": "\"productIds\" must include only numbers" }</code>, caso o campo <code>productIds</code> esteja vazio ou inclua itens que não sejam do tipo número; <br>
  </details>
  <br>

</details>
<br>