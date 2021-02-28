# House Media Server

## Node.js Server && React Client to browse, view and update the media on my NAS

### Frameworks
 - [next.js](https://nextjs.org/)

### Shared
 - [typescript](https://www.typescriptlang.org/)
 - [jest](https://jestjs.io/)

### React Client
  - [styled-components](https://styled-components.com/)
  - [@apollo/client](https://www.apollographql.com/docs/react/)
  - [framer-motion](https://www.framer.com/motion/)
  - [react-player](https://github.com/CookPete/react-player)
  - [@testing-library/react](https://testing-library.com/docs/react-testing-library/intro/)

### Node.js Server
  - [graphql](https://graphql.org/)
  - [apollo-server-micro](https://www.apollographql.com/docs/apollo-server/v1/servers/micro/)
  - [knex](http://knexjs.org/)
  - [node-mocks-http](https://github.com/howardabrams/node-mocks-http)

### DB
  - [pg](https://github.com/brianc/node-postgres)
  - [docker](https://www.docker.com/)

#### Get Started
  1. Pull down repo
  2. `docker-compose up -d` && `yarn install`
  3. Populate `.env.example` & rename it to `.env.local`

#### Working Locally
| | |
|:-|-:|
|`yarn dev` | runs the next.js dev server|
|`yarn build` | generates all static content|
|`yarn start` | runs the production server|
|`yarn test` | runs all tests found in `__tests__`|