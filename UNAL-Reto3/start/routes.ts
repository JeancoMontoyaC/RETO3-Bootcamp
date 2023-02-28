/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async () => {
  return { hello: 'world' }
})

Route.group(() => {
  
  Route.post("/registrar", "AuthController.register")
  Route.post("ingresar", "AuthController.login")

  
  Route.group(() => {
    Route.post("registrar-libro", "BooksController.store")
    Route.get("/libros", "BooksController.index")
    Route.get("libros-porId/:id", "BooksController.show")
  
    Route.get("perfiles-porId/:id", "PerfilsController.show")
  }).middleware("auth")

  
  
  Route.group(() => {
    Route.put("actualizar-usuario/:id", "AuthController.actualizarUsuario")
    Route.delete('/eliminar-libro/:id', 'BooksController.eliminarLibro')
    Route.put("actualizar-perfil:id", "PerfilsController.update")
    Route.delete('/eliminar-perfil/:id', 'PerfilsController.eliminarLibro')
    Route.delete('/eliminar-usuario/:id', 'AuthController.eliminarUsuario')
    Route.put("actualizar-libro/:id", "BooksController.update")

  }).middleware(["auth", "admin"])

  Route.group(() => {
    Route.get('listar-usuarios', "AuthController.getListarUsuarios")
    Route.get('/buscar-id/:id', 'AuthController.buscarPorId')
    Route.get("/perfiles", "PerfilsController.index")
    Route.post("registrar-perfil", "PerfilsController.registrarPerfil")
  }).middleware(["auth", "dev"])
}).prefix("api")
