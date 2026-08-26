# ListUsers

Aplicação fullstack para gerenciamento de listas de usuários.

O projeto utiliza uma arquitetura separada entre **frontend**, **backend** e **banco de dados**, com os serviços executados através do **Docker Compose**.

Projeto teve o intuito de entender mais o POO e seus conceitos, princípios SOLID e o multi-stage build do Docker.

## Tecnologias

### Backend

- Node.js
- TypeScript
- Express
- Prisma ORM
- PostgreSQL
- JWT
- Bcrypt

### Frontend

- React
- TypeScript
- Vite
- Tailwind CSS

### Infraestrutura

- Docker
- Docker Compose
- Nginx

---

## Pré-requisitos

Antes de executar o projeto, tenha instalado:

- Docker
- Docker Compose

Não é necessário instalar Node.js ou PostgreSQL localmente quando utilizando Docker.

---

## Como executar

Clone o repositório:

git clone https://github.com/paulossrg/ListUsers.git

Configure as variáveis de ambiente na raiz do projeto:

- POSTGRES_USER=postgres
- POSTGRES_PASSWORD=sua_senha
- POSTGRES_DB=listUsers
- DATABASE_URL=postgresql://postgres:sua_senha@postgres:5432/listUsers
- JWT_SECRET=sua_chave_secreta

No front configure uma variável de ambiente:

- VITE_API_URL="SUA_API_URL_AQUI"

Tem o env.example para seguir

Execute os containers:

```docker compose up -d```

Isso vai iniciar os containers postgres, frontend e backend

Caso seja a primeira vez rodando, execute ```docker compose exec backend npx prisma migrate deploy``` para configurar o banco 
