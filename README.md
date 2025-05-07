# Desafio Von Braun Labs
# Para essa solução utilizamos as seguintes etapas:
**Servidor da Api de consumo**
1. **JsonServer** para colocar a API hipotética (Community IoT Device, ou CIotD) padrão OpenApi  
  1.1 - Criei um servidor local com JsonServer com um comando "npm install -g json-server"  
  1.2 - Criei um arquivo db.json e coloquei nesse servidor, como chave principal "device" correspondendo assim o endpoint "/device"  
  1.3 - Coloquei para executar o comando "json-server --watch db.json --port 3000"  
**Backend C# - API Consumidora**
2. Para criação de um Backend a ser desenvolvido em AspnetCore 8.0 C SHARP  
   2.1 - Utilizei na solução "CIoTD" com a pretenção de separação de responsabilidades sendo:  
   2.2 - Projeto ASP.NET Core Web API  
     -** _Pacotes instalados_**:  
           * **Microsoft.AspNetCore.Authentication.JwtBearer** e **System.IdentityModel.Tokens.Jwt**, pois com essas bibliotecas torna-se possível a funcionalidade de autenticação com JWT Bearer e a criação e manipulação de tokens JWT respectivamente  
           * **Microsoft.AspNetCore.Identity.EntityFrameworkCore** Com instalação desse ORM temos as classes necessárias para gerenciar Usuários, Roles e a autenticação dos mesmo no sistema, para simplificar utilizamos outra biblioteca **Microsoft.EntityFrameworkCore.InMemory** que é um provedor de Entity Framework Core que usa um banco de dados em memória  
           * Também inclui a biblioteca **Microsoft.Extensions.Http** que fornece abstrações para trabalhar com requisições HTTP  
           * **BCrypt.Net-Next** para armazenamento e criptografia de senhas  
   2.2.2 - **AuthController** - Endpoint responsável pela entrada das credenciais do usuário (Username e Password), bloqueio, caso não esteja autenticado, ou geraçao do token JWT e envio/retorno para o client solicitante.
   2.2.3 - **DevicesController** - Endpoint exposto a requisições que possuem credenciais validadas por meio do Token inseridos no Header da mesma
 2.3 - Projeto Application
   2.3.1 - Aqui foram postas as classes DTOs, para não expor as classes de domínio na API decidi criá-los 
   2.3.2 - Aqui tinha a intenção de criar as classes de mappeamento para a transformação dos Dtos em modelos de domínio e vice-versa (Não implementada)
   2.3.3 - Aqui tinha a intenção de criar as classes de serviço para não expor os métodos de repositório diretamente na camada de API e realizar aqui as lógicas de negócio (Não implementada)
 2.4 - Projeto CrossCutting
 2.5 - Projeto Domain
   2.5.1 - Localização das classes de domínio
   2.5.2 - Localização dos contratos/interfaces de Repositorios ou de Serviços (Não implementada)
   2.5.3 - Localização das validações (Não implementada)
 2.6 - Projeto Infra
   2.6.1 - Localização do contexto da aplicação, classe onde ORM (EntityFramework) realiza a criação do usuário **(Username = "admin" e Password = "admin123!")** em memória para permitir o login na aplicação.
4. Criação Frontend será desenvolvido em angular 19
