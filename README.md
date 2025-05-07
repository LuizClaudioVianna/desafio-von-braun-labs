# Desafio Von Braun Labs
# Para essa solução utilizamos as seguintes etapas:
**Servidor da Api de consumo**
1. **JsonServer** para colocar a API hipotética (Community IoT Device, ou CIotD) padrão OpenApi  
 1.1 - Criei um servidor local com JsonServer com um comando "npm install -g json-server"  
 1.2 - Criei um arquivo db.json e coloquei nesse servidor, como chave principal "device" correspondendo assim o endpoint "/device"  
 1.3 - Coloquei para executar o comando "json-server --watch db.json --port 3000"  

**Backend C# - Solução Consumidora CIoTD**  
2. Para criação de um Backend a ser desenvolvido em AspnetCore 8.0 C# utilizei na solução "**CIoTD**" com a pretenção de separação de responsabilidades sendo:  
  
  2.2 - Projeto API **(CIoTD.API)**  
  ***Pacotes instalados***:  
    a) **Microsoft.AspNetCore.Authentication.JwtBearer** e **System.IdentityModel.Tokens.Jwt**, pois com essas bibliotecas torna-se possível a funcionalidade de autenticação com JWT Bearer e a criação e manipulação de tokens JWT respectivamente  
    b) **Microsoft.AspNetCore.Identity.EntityFrameworkCore** Com instalação desse ORM temos as classes necessárias para gerenciar Usuários, Roles e a autenticação dos mesmo no sistema, para simplificar utilizamos outra biblioteca **Microsoft.EntityFrameworkCore.InMemory** que é um provedor de Entity Framework Core que usa um banco de dados em memória  
    c) **Microsoft.Extensions.Http** que fornece abstrações para trabalhar com requisições HTTP  
    d) **BCrypt.Net-Next** para armazenamento e criptografia de senhas  
  
  ***Controllers***:  
    a) **AuthController** - Endpoint responsável pela entrada das credenciais do usuário (Username e Password), bloqueio, caso não esteja autenticado, ou geraçao do token JWT e envio/retorno para o client solicitante.  
    b) **DevicesController** - Endpoint exposto a requisições que possuem credenciais validadas por meio do Token inseridos no Header da mesma.  
  
  2.3 - Projeto Class Library **(CIoTD.Application)** 
   a) As classes DTOs, para não expor as classes de domínio na API  
   b) Intenção de criar as classes de mapeamento para a transformação dos Dtos em modelos de domínio e vice-versa (Não implementada)  
   c) Intenção de criar as classes de serviço para não expor os futuros métodos de repositório diretamente na camada de API e realizar aqui as lógicas de negócio (Não implementada)  
   
 2.4 - Projeto Projeto Class Library **(CIoTD.CrossCutting)**  
   a) Localização da configuração das injeções de dependência DI - Implementada no projeto nesse momento somente a configuração do JWT  
   b) Localização da configuração das injeções de dependencias dos futuros seviços e seus contratos (Não implementado)  
   c) Localização da configuração das injeções de dependencias dos futuros repositórios e seus contratos (Não implementado)  

 2.5 - Projeto Domain **(CIoTD.Domain)**  
   a) Localização das classes de domínio  
   b) Localização dos contratos/interfaces de Repositorios ou de Serviços (Não implementada)  
   c) Localização das validações (Não implementada)

 2.6 - Projeto Infra **(CIoTD.Infra)**  
   2.6.1 - Localização do contexto da aplicação, classe onde ORM (EntityFramework) realiza a criação do usuário **(Username = "admin" e Password = "admin123!")** em memória para permitir o login na aplicação.  
   
3. Criação Frontend será desenvolvido em angular 19
