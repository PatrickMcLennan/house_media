# House Media Server

## Node.js Server & React Client to browse, view and update the media on my NAS

Media content is added to the NAS HDD with its [tmdb ID](https://developers.themoviedb.org/3/getting-started/introduction) attached. Ex:
  > `Batman Returns [TMDB_MOVIE_ID].mk4`, 

  > `Austin Powers [TMDB_MOVIE_ID].mk4`,

  > `The Simpsons[TMDB_SHOW_ID]/S12 [TMDB_SEASON_ID]/S12E7 [TMDB_EPISODE_ID].avi`,

  > `Breaking Bad[TMDB_SHOW_ID]/S4 [TMDB_SEASON_ID]/S4E3 [TMDB_EPISODE_ID].avi`,

Via cron or API trigger, the hdd is swept for new content.  If ids are found on the hdd not yet in the postgres db, a GET request is made to the tmdb API for that movie or shows information.  We then store all information & the files hdd path in the db.

Any time content is added to the db a rebuild event is triggered, causing Next.js to Statically Generate a page for every id in the db.  After this, our pm2 process restarts and our app is now up to date with the latest static content on our hdd.
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

### Hygiene
  - [eslint](https://eslint.org/)
  - [prettier](https://prettier.io/)

### DB
  - [pg](https://github.com/brianc/node-postgres)
  - [docker](https://www.docker.com/)

### Deployment
  - [pm2](https://pm2.keymetrics.io/)

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