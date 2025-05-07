# desafio-von-braun-labs
Para essa solução utilizamos as seguintes etapas:
**Servidor da Api de consumo**
1. Criação JsonServer para colocar a API hipotética (Community IoT Device, ou CIotD) padrão OpenApi
  1.1 - Criei um servidor local com JsonServer com um comando "npm install -g json-server"
  1.2 - Criei um arquivo db.json e coloquei nesse servidor, como chave principal "device" correspondendo assim o endpoint "/device"
  1.3 - Coloquei para executar o comando "json-server --watch db.json --port 3000"
2. Criação de um Backend desenvolvido em AspnetCore 8.0 C SHARP
  2.1 - 
4. Criação Frontend será desenvolvido em angular 19
