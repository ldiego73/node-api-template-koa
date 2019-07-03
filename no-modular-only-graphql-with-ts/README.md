# Modular

This is un modular template using the web framework Koa

## Table of Contents

- [Features](#Features)
- [Dependencies](#Dependencies)
- [Usage](#Usage)
- [Configuration](#Configuration)
- [Docker](#Docker)
- [Heroku](#Heroku)

## Features

- Works with ES6/ES7 using TypeScript.
- Supports the latest node features.
- Free and open source!

## Dependencies

List of dependencies the server http:

```
yarn add koa koa-bodyparser koa-compress koa-helmet koa-morgan helmet-csp ioredis axios cross-env yenv http-errors
yarn add -D @types/koa @types/koa-bodyparser @types/koa-helmet @types/koa-morgan @types/koa-compress @types/ioredis @types/http-errors
```

List of dependencies for server graphql:

```
yarn add @graphql-modules/core apollo-server-koa graphql graphql-tools
yarn add -D @types/graphql @types/glob
```

List of dependencies the compiler Typescript

```
yarn add -D typescript ts-node
```

List of dependencies for eslint:

```
yarn add -D eslint prettier eslint-config-prettier eslint-plugin-prettier eslint-plugin-filenames babel-eslint eslint-config-google
yarn add -D @typescript-eslint/eslint-plugin @typescript-eslint/parser
```

List of dependencies for utils:

```
yarn add -D rimraf fancy-log
yarn add -D @types/fancy-log
```

List of dependencies for test:

```
yarn add -D jest jest-extended jest-html-reporters jest-html-reporter supertest
yarn add -D @types/jest ts-jest @types/supertest
```

List of dependencies for documentation:

```
yarn add swagger2-koa
```

List of dependencies for development:

```
yarn add -D nodemon
```

List of dependencies for production:

```
yarn global add pm2
```

## Usage

Commands are specific to the directory, so execute all commands in the root directory.

#### `yarn clean`

Delete the next folders generate: .cache, dist, reports, tmp.

#### `lint:code`

Validate eslint rules and preview console results.

#### `lint:report`

Validate eslint rules and preview results in html.

#### `format`

Allows format all files in the src folder.

#### `format:fix`

Allows format and fix all files in the src folder.

#### `develop`

Execute the project in development mode `NODE_ENV=development`, is posibble to work with hot reloading.

#### `test`

Execute all the tests using `NODE_ENV=test`.

#### `test:unit`

Execute all the unit tests using `NODE_ENV=test`.

#### `test:integration`

Execute all the integration using `NODE_ENV=test`.

#### `coverage`

Execute all the tests and preview results the coverage in html.

#### `coverage:unit`

Execute all the unit tests and preview results the coverage in html.

#### `coverage:integration`

Execute all the integration tests and preview results the coverage in html.

#### `build`

Generates the dist folder with the files minified and ready to be uploaded to production.

#### `serve`

Execute the project in production mode `NODE_ENV=production`.

## Configuration

The configuration of the project can be found in the `env.yaml`

## Docker

#### `build`

Command:

```
docker build -t api:latest .
```

#### `run`

Command:

```
docker run -d -p 80:80 -it --name api-container api:latest
```

#### `logs`

Command:

```
docker logs api-container
```

#### `exec`

Command:

```
docker exec -it api-container bash
```

## Heroku

#### `login`

```
heroku login
heroku container:login
```

#### `push`

```
heroku container:push web -a=api
```

#### `deploy`

```
heroku container:release web -a=api
```

##### `logs`

```
heroku logs --tail -a=api
```
