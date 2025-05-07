# Desafio Von Braun Labs
# Etapas da solução:
**Servidor da Api de consumo**  
+ ***JsonServer*** para colocar a API hipotética (Community IoT Device, ou CIotD) padrão OpenApi;
+ Criei um servidor local com JsonServer com um comando "npm install -g json-server";
+ Criei um arquivo db.json e coloquei nesse servidor, como chave principal "device" correspondendo assim o endpoint "/device";
+ Coloquei para executar o comando "json-server --watch db.json --port 3000";  

**Backend C# - Solução Consumidora CIoTD**  
Para um Backend utilizei a versão AspnetCore 8.0 C# nomeando como: "**CIoTD**" com a pretenção de separação de responsabilidades sendo:  
 + Projeto API **(CIoTD.API)**  
  ***Pacotes instalados***:  
    a) **Microsoft.AspNetCore.Authentication.JwtBearer** e **System.IdentityModel.Tokens.Jwt**, pois com essas bibliotecas torna-se possível a funcionalidade de autenticação com JWT Bearer e a criação e manipulação de tokens JWT respectivamente  
    b) **Microsoft.AspNetCore.Identity.EntityFrameworkCore** Com instalação desse ORM temos as classes necessárias para gerenciar Usuários, Roles e a autenticação dos mesmo no sistema, para simplificar utilizamos outra biblioteca **Microsoft.EntityFrameworkCore.InMemory** que é um provedor de Entity Framework Core que usa um banco de dados em memória  
    c) **Microsoft.Extensions.Http** que fornece abstrações para trabalhar com requisições HTTP  
    d) **BCrypt.Net-Next** para armazenamento e criptografia de senhas  

   ***Controllers***:  
   a) **AuthController** - Endpoint responsável pela entrada das credenciais do usuário (Username e Password), bloqueio, caso não esteja autenticado, ou geraçao do token JWT e envio/retorno para o client solicitante;  
   b) **DevicesController** - Endpoint exposto a requisições que possuem credenciais validadas por meio do Token inseridos no Header da mesma;  
  
 + Projeto Class Library **(CIoTD.Application)**  
   a) As classes DTOs, para não expor as classes de domínio na API  
   b) Intenção de criar as classes de mapeamento para a transformação dos Dtos em modelos de domínio e vice-versa (Não implementada)  
   c) Intenção de criar as classes de serviço para não expor os futuros métodos de repositório diretamente na camada de API e realizar aqui as lógicas de negócio (Não implementada)  
   
 + Projeto Projeto Class Library **(CIoTD.CrossCutting)**  
   a) Localização da configuração das injeções de dependência DI - Implementada no projeto nesse momento somente a configuração do JWT  
   b) Localização da configuração das injeções de dependencias dos futuros seviços e seus contratos (Não implementado)  
   c) Localização da configuração das injeções de dependencias dos futuros repositórios e seus contratos (Não implementado)  

 + Projeto Domain **(CIoTD.Domain)**  
   a) Localização das classes de domínio  
   b) Localização dos contratos/interfaces de Repositorios ou de Serviços (Não implementada)  
   c) Localização das validações (Não implementada)

 + Projeto Infra **(CIoTD.Infra)**
   a) Localização do contexto da aplicação, classe onde ORM (EntityFramework) realiza a criação do usuário **(Username = "admin" e Password = "admin123!")** em memória para permitir o login na aplicação.

**Frontend Angular 19 - Solução Frontend Community IoT Device - CIoTD**  
***Pacotes instalados***:  
 **PrimeNg** - https://primeng.org/ - Reutilização de components de forma mais rápida, modular e fácil;  
 **PrimeFlex** - https://primeflex.org/ - Renderização de layout de tela responsiva;  
 **SweetAlert** - https://sweetalert2.github.io/ - Utilização de alertas customizáveis e simples utilização;  
 Todos os componentes utilizados nessa aplição são standalone o que significa que não precisa mais ser declarado em um NgModule para ser usado na aplicação, dessa forma ele se declara e importa suas próprias dependências diretamente;  
 ***Estrutura da Aplicação***:  
 "**/src/app/pages**": Localização de todos os components que chamamos de páginas;  
 "**/src/app/resources**": Localização dos seguintes recursos:  
 - interceptors - Para essa aplicação criei o "**authInterceptor**", ele é o responsável por interceptar as requisições http e adicionar um header chamado "**Authorization**", forçando que somente usuários credenciados possam acessar os endpoints da API;
 -  interfaces - Todos os modelos de tela que fazem referencia ao negócio da aplicação;
 -  models - Foram as classes criadas para serem usadas nas requisições;
 -  services - Localização das classes que executam as chamadas http para a **solução API consumidora CIoTD**;  
A configuração das rotas da aplição está no caminho "**app/app.routes.ts**";  
Nessa versão do angular foi necessária a configuração dos pacotes instalados e essa configuração fica no caminho "**app/app.config.ts**"





