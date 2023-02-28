import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class UsersSchema extends BaseSchema {
  protected tableName = 'users'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {

      table.string('tipo_identificacion', 255).notNullable()
      table.integer('identificacion').unsigned().unique().notNullable()
      table.integer('perfil').notNullable().references('perfils.id').onDelete('cascade')
      table.string('municipio', 255).notNullable()
      table.increments('id').primary()
      table.string('nombres', 255).notNullable()
      table.string('apellidos', 255).notNullable()

      table.string('departamento', 255).notNullable()
      table.string('password', 180).notNullable()
      table.string('direccion', 255).notNullable()
      table.string('barrio', 255).notNullable()
      table.string('remember_me_token').nullable()
      table.timestamps(true)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
