import Knex from 'knex';

const knexconfig = {
    development: {
      client: 'pg',
        connection: {
          database: 'discord_verify',
          user: 'postgres',
          password: 'ryan'
        }
    }
}

const knex = Knex(knexconfig.development);

export default knex;