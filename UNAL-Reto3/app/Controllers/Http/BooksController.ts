import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Book from 'App/Models/Book'

export default class BooksController {
    public async store({ request }: HttpContextContract){

        const book = new Book()
        book.titulo = request.input('titulo')
        book.autor = request.input('autor')
        book.editorial = request.input('editorial')
        book.formato = request.input('formato')
        book.n_paginas = request.input('paginas')
        book.id_usuario = request.input('id_usuario')
        await book.save()
        return{
            "Libro": book,
            "msg": "Registro exitoso",
            "estado": 200}}

    public async index() {
        const books = await Book.query()
        return books
    }

    public async show({ params}: HttpContextContract){
        try{
            const book = await Book.find(params.id)
            if(book){
                return book
            } else{
                return("registro no existe")}
            } catch(error){
            console.log(error)}}

    public async update({request, params}: HttpContextContract){
        const book = await Book.find(params.id)
        if (book) {
            book.titulo = request.input('title')
            book.autor = request.input('author')
            book.editorial = request.input('editorial')
            book.formato = request.input('formato')
            book.n_paginas = request.input('paginas')
            book.id_usuario = request.input('id_usuario')

            if (await book.save()) {
                return {
                    "msg": "Actualizado correctamente",
                    book}}
                    
            return ({
                "msg": "No se pudo actualizar",
                "estado": 401})}
        return({
            "msg": "Registro no encontrado",
            "estado": 401})}

    public async eliminarLibro({ request}: HttpContextContract){
        const id = request.param('id');
        await Book.query().where('id', id).delete();
        return("Registro eliminado");
    }
}

