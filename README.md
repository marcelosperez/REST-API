# REST-API

This repository contains several Node.js and Express REST API examples, including a MongoDB-backed session API in `Module03`.

## Project Layout

* `Module03` contains the current Express + Mongoose API.
* `Module02` contains a MySQL-backed REST API example.
* `Module01` contains early CRUD exercises, including the original in-memory examples.

## Module03

The `Module03` application provides a simple user session endpoint using MongoDB and Mongoose.

### Key behavior

* Accepts `POST /sessions` with JSON payload `{ "email": "user@example.com" }`
* validates that `email` is present and uses a basic email format check
* if the user already exists, returns:
  * `message: "User already exists"`
  * the existing `user` record
* if the user does not exist, creates and returns a new `user`

### Run Module03

```bash
cd Module03
npm install
node src/server.js
```

> For local development, you can also use `npx nodemon src/server.js` if `nodemon` is installed.

### Configuration

The backend uses MongoDB. Do not store plain credentials in the README or source control. Instead, configure the connection string via an environment variable such as `MONGO_URI`.

## Module01

Contains early API practice files and in-memory CRUD examples.

## Module02

Legacy MySQL REST API example using `mysql2`.

## Goal

The repository is meant to build practical experience with backend development, Express APIs, MongoDB integration, and session/user handling.
