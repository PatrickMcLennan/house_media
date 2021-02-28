'use strict';

exports.up = async function up(knex) {
  await knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";');

  await knex.schema.createTable('genres', (table) => {
    table.uuid('id').notNullable().defaultTo(knex.raw('uuid_generate_v4()')).primary();

    table.integer('tmdb_id').unsigned().notNullable();

    table.text('name').notNullable().unique();
  });

  await knex.schema.createTable('movies', (table) => {
    table.uuid('id').notNullable().defaultTo(knex.raw('uuid_generate_v4()')).primary();

    table.boolean(`adult`);
    table.text(`backdrop_path`);
    table.text(`belongs_to_collection`);
    table.timestamp(`created_at`).notNullable().defaultTo(knex.fn.now());
    table.text(`homepage`);
    table.integer(`tmdb_id`).unsigned().notNullable();
    table.text('name').notNullable();
    // table.text(`languages`);
    table.text(`original_language`);
    table.text(`original_title`);
    table.text(`overview`);
    table.text(`popularity`);
    table.text(`poster_url`);
    table.date(`release_date`);
    table.text(`revenue`);
    table.text(`status`);
    table.date(`updated_at`).notNullable().defaultTo(knex.fn.now());
    table.text(`vote_average`);
    table.text(`vote_count`);

    table.datetime('released_at').notNullable();
  });

  await knex.schema.createTable('movie_genres', (table) => {
    table.uuid('movie_id').notNullable().references('id').inTable('movies');

    table.uuid('genre_id').notNullable().references('id').inTable('genres');
  });

  await knex.schema.createTable('production_companies', (table) => {
    table.uuid('id').notNullable().defaultTo(knex.raw('uuid_generate_v4()')).primary();
    table.text(`logo_url`);
    table.text(`name`).notNullable();
    table.text(`origin_country`).notNullable();
  });
};

exports.down = async function down(knex) {
  await knex.schema.dropTableIfExists('movie_genres');
  await knex.schema.dropTableIfExists('movies');
  await knex.schema.dropTableIfExists('genres');
  await knex.schema.dropTableIfExists('production_companies');
  await knex.raw('DROP EXTENSION IF EXISTS "uuid-ossp";');
};
