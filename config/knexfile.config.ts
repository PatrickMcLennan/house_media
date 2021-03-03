import stringcase from 'knex-stringcase';
import path from 'path';
import { config } from 'dotenv';

config({ path: path.resolve(__dirname, `../.env.local`) });

const knexConfig = {
  client: 'pg',
  connection: {
    host: process.env.HOST,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
  },
} as const;

export default stringcase(knexConfig);
