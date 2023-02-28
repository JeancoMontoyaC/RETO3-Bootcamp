import { DateTime } from 'luxon'
import { BaseModel, column, hasOne, HasOne } from '@ioc:Adonis/Lucid/Orm'
import User from './User'

export default class Book extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public titulo: string
  
  @column()
  public autor: number

  @column()
  public editorial: string

  @column()
  public formato: string

  @column()
  public n_paginas: number

  @column()
  public id_usuario: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasOne (() => User)
  public users: HasOne<typeof User>
}
