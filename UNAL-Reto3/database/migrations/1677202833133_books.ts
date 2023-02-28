import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Books extends BaseSchema {
  protected tableName = 'books'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('titulo', 200).notNullable()
      table.integer('autor').unsigned().notNullable()
      table.string('editorial', 200).notNullable()
      table.string('formato', 200).notNullable()
      table.integer('n_paginas').unsigned().notNullable()
      table.integer('id_usuario').notNullable().references('users.identificacion').onDelete('cascade')
      table.timestamps(true)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
