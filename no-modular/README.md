# Modular

This is un no modular template using the web framework Koa

## Table of Contents

- [Features](#Features)
- [Dependencies](#Dependencies)
- [Usage](#Usage)
- [Configuration](#Configuration)
- [Docker](#Docker)
- [Heroku](#Heroku)

## Features

- Works with ES6/ES7 using Babel.
- Supports the latest node features.
- Free and open source!

## Dependencies

List of dependencies the server http:

```
yarn add koa koa-router koa-bodyparser koa-compress koa-helmet koa-morgan helmet-csp @hapi/joi ioredis axios cross-env yenv
```

List of dependencies for server graphql:

```
yarn add @graphql-modules/core apollo-server-koa graphql graphql-tools
```

List of dependencies the compiler the files ES6/ES7 to ES5

```
yarn add -D @babel/cli @babel/core @babel/node @babel/polyfill @babel/preset-env
yarn add -D @babel/plugin-proposal-export-default-from @babel/plugin-proposal-export-namespace-from babel-preset-minify
```

List of dependencies for eslint:

```
yarn add -D eslint prettier eslint-config-prettier eslint-plugin-prettier eslint-plugin-filenames babel-eslint eslint-config-google
```

List of dependencies for utils:

```
yarn add -D rimraf fancy-log
```

List of dependencies for test:

```
yarn add -D jest jest-extended jest-html-reporters jest-html-reporter supertest
```

List of dependencies for documentation:

```
yarn add swagger2-koa
```

List of dependencies for development:

```
yarn add -D nodemon gulp gulp-copy gulp-uglify-es
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
