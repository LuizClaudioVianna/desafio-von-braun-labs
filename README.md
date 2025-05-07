# desafio-von-braun-labs
Para essa solução utilizamos as seguintes etapas:
**Servidor da Api de consumo**
1. Criação JsonServer para colocar a API hipotética (Community IoT Device, ou CIotD) padrão OpenApi
  1.1 - Criei um servidor local com JsonServer com um comando "npm install -g json-server"
  1.2 - Criei um arquivo db.json e coloquei nesse servidor, como chave principal "device" correspondendo assim o endpoint "/device"
  1.3 - Coloquei para executar o comando "json-server --watch db.json --port 3000"
2. Para criação de um Backend a ser desenvolvido em AspnetCore 8.0 C SHARP
   2.1 - Utilizei na solução "CIoTD"
   2.2 - Criei um Projeto de API com o nome de Projeto ASP.NET Core Web API
     2.2.1 - Precisei instalar os pacotes:
           * **Microsoft.AspNetCore.Authentication.JwtBearer** e **System.IdentityModel.Tokens.Jwt**, pois com essas bibliotecas torna-se possível a funcionalidade de autenticação com JWT Bearer e a criação e manipulação de tokens JWT respectivamente;
           * **Microsoft.AspNetCore.Identity.EntityFrameworkCore** Com instalação desse ORM temos as classes necessárias para gerenciar Usuários, Roles e a autenticação dos mesmo no sistema, para simplificar utilizamos outra biblioteca **Microsoft.EntityFrameworkCore.InMemory** que é um provedor de Entity Framework Core que usa um banco de dados em memória.
           * Também inclui a biblioteca **Microsoft.Extensions.Http** que fornece abstrações para trabalhar com requisições HTTP.
   
4. Criação Frontend será desenvolvido em angular 19
