# Atividade de Ambiente de Desenvolvimento de Software

## Estrutura do Projeto
```
swarm-redundante
    api
        app.js
        Dockerfile
        package.json
    docker-compose.yml
```

## Tecnologias do Projeto
- **Javascript**
- **Node.js**
- **Express** 
- **Docker Swarm**

## Como Rodar

``` 
# Clone o projeto
git init
git clone https://github.com/FellipeAlmeida/Docker-Swarm-Redundante

# Inicialize o Docker Swarm com o seguinte comando:
Docker swarm init

# Builda a api
docker build -t aluno/swarm-api:1.0 ./api

# Por fim, crie e gerencie os containers do docker compose
docker stack deploy -c docker-compose.yml redundante
```

# O que está acontecendo?

## Explicação por arquivo

### app.js
É a nossa api, incializa a instância do express e cria duas rotas (/ e /info)

### Dockerfile
Arquivo Dockerfile que faz uma sequência de comandos. Ele faz: 
- define a imagem a ser usada (node)
- define a área de trabalho (/api)
- copia e baixa as dependências do package.json
- expõe a porta 300
- roda a api

### Package.json
É onde fica as depências do projeto

### Docker-compose.yml
- Cria os serviços e rede (api, monitor, appnet)
- no serviço da api defino build e image (porém o build não funciona, por isso roda o comando docker build -t aluno/swarm-api:1.0 ./api)
- define a porta da api
- no deploy defino 3 replicas (containers da api), 1 em paralelismo, e defino a ordem de build das replicas (o que começa primeiro), restarta a replica ao cair e defino a rede
- no monitor uso a imagem do alpine e rodo um comando que roda a api /info a cada 3 segundos (para monitoramento)
- crio a rede appnet

# Como acessar? 

```
localhost:8080

se não funcionar adicione o ip da sua máquina e tente novamente, dessa forma:
docker swarm init --advertise-addr SEU_IP_LOCAL

e acesse pelo seu ip
http://SEU_IP_LOCAL/info
```

# Resultados

```
Ao rodar o comando docker stack services redundante
```

<img width="814" height="71" alt="image" src="https://github.com/user-attachments/assets/b4cada23-8933-4e05-b97f-b1366f300010" />
ng


```
Ao rodar docker service ps redundante_api

```

<img width="1366" height="191" alt="image-1" src="https://github.com/user-attachments/assets/f344444b-9ebe-4a7d-89ca-7332184869c8" />


```
Imagem do rota /info funcionando
```

<img width="1920" height="1080" alt="image-2" src="https://github.com/user-attachments/assets/c6165b97-f0e5-4320-ad4a-08dcb325d7e0" />

```
Imagem da rota /info novamente, mas dessa vez com outro host (outro serviço da stack)
```

<img width="1920" height="1080" alt="image-3" src="https://github.com/user-attachments/assets/4922a6a9-e204-48e3-8691-a3eb9de9b211" />


```
Logs do monitor, mostrando vários hosts.
```

<img width="1016" height="273" alt="image-4" src="https://github.com/user-attachments/assets/e9b0e18c-f357-489d-af37-aec4f0be9b19" />


```
Antes de parar um container:
```
<img width="1372" height="310" alt="image-5" src="https://github.com/user-attachments/assets/6872728c-b097-4074-ba24-5fa2a35d5521" />

```
Depois de parar:
```
<img width="1261" height="327" alt="image-6" src="https://github.com/user-attachments/assets/a92c410f-742f-462b-8f86-719a43cc0fed" />

