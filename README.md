# Node.js Microservice Blueprint

A minimal blueprint for a **REST microservice in JavaScript / Node.js** that reads and writes data in MySQL, built with Express. The accompanying step-by-step tutorial walks through creating the service from scratch.

> Status: **tutorial / template, not maintained** (2019-2020). Dependencies are old (Express 4.16, Node 10 base image); update them before real use.

## Contents

- `app.js`, `bin/www` - Express application and server start (port from `PORT`, default 3000)
- `Dockerfile` - container image for the service
- [`docs/TUTORIAL.md`](docs/TUTORIAL.md) - the full tutorial: project setup, `insert` / `getAll` / `getByName` routes, MySQL access

## Tech stack

Node.js, Express 4, `mysql`, `moment`, `morgan`, `cookie-parser`.

## Run

```bash
npm install
npm start          # http://localhost:3000
```

```bash
docker build -t microservice-blueprint .
docker run -p 3000:3000 microservice-blueprint
```

A MySQL database is required; follow the tutorial for the table and connection setup.
