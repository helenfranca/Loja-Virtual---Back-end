import { createConnection } from 'typeorm';

require('dotenv').config();
export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: async () =>
      await createConnection({
        type: 'postgres',
        host: process.env.DB_HOST,
        port: 5432,
        username: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_USER,
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        dropSchema: true,
        //synchronize: true,
      }),
  },
];

