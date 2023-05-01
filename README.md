# How to run the application

## Requirements

- Node
- Docker

## Steps

### Install dependencies

```sh
npm install
```

### Set environment

Create a new file named ".env" in the current working directory and then fill in the environment variables

### Run mysql server

```sh
docker-compose up -d
```

### Migrate database

```sh
npm run migrate:latest
```

### Create prisma schema

```sh
npx prisma db pull
```

### Generate prisma client

```sh
npx prisma generate
```

### Run the application

```sh
npm run dev
```
