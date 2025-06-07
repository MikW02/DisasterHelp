API RESTful desenvolvida em Java com Spring Boot para cadastro e gerenciamento de desastres ambientais. Projeto da Global Solution FIAP 2025 (1º semestre).


## Testado no cmd do windows

# 1. Gerar o `.jar` da aplicação

dentro de \GSDISASTER\DisasterHelp

mvnw clean package -DskipTests

# 2. Criar a imagem da aplicação no Docker

docker build -t disasterhelp-app .

# 3. Subir o container do PostgreSQL

docker run -d --name postgres-db -e POSTGRES_DB=disasterdb -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=postgres123 -v pgdata:/var/lib/postgresql/data -p 5432:5432 postgres:15

# 4. Subir o container da aplicação Java

docker run -d --name disasterhelp-api --link postgres-db -p 8080:8080 disasterhelp-app

# Banco de dados em docker

- Banco: `disasterdb`  
- Usuário padrão criado automaticamente pela api:

Email: admin@disasterHelp.com  
Senha: admin123

# Acessar o banco pelo terminal:

docker exec -it postgres-db psql -U postgres -d disasterdb

# Para exibir as tabelas:

\dt
SELECT * FROM desastres;
SELECT * FROM usuario;
\q



# Integração com App Mobile
### COM O BD E A API ABERTOS!!!

\GSDISASTER\Mobile

# foi testado com:
npx react-native run-android


# Para parar e limpar tudo

docker stop disasterhelp-api postgres-db
docker rm disasterhelp-api postgres-db
docker volume rm pgdata

## Autores

RM551382 Michael Leon