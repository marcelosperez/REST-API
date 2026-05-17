# REST-API

This repository contains small Node.js and Express examples for learning REST APIs.

## Project Layout

* `Module01` contains early CRUD exercises, including the original `index8codex.js` in-memory version.
* `Module02` contains the updated MySQL-backed REST API.

## Module02

The new API lives in [Module02/courses-api.js](Module02/courses-api.js).

It now:

* connects to MySQL using `mysql2`
* uses the Dockerized local database at `127.0.0.1:3306`
* authenticates with user `root` and password `********`
* creates a dedicated database named `rest_api_db`
* creates the `courses` table automatically on startup

## Available Endpoints

* `GET /courses`
* `GET /courses/:id`
* `POST /courses`
* `PUT /courses/:id`
* `DELETE /courses/:id`

## Run Module02

```bash
cd Module02
yarn install
yarn start
```

## Goal

The project is meant to build practical experience with backend development, CRUD APIs, and database integration.
