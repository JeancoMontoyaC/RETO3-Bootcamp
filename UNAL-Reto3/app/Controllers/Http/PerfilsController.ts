import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Perfil from 'App/Models/Perfil'

export default class PerfilsController {
    public async registrarPerfil({ request }: HttpContextContract){

        const perfil = new Perfil()
        if (request.input('descripcion')!= 'Admin'&& request.input('descripcion')!='Dev'&&request.input('descripcion')!='User'){ /* Son los 3 tipos de perfiles permitidos*/
            return{
                "msg":"Error: tipo de perfil no existe"}} 


        perfil.descripcion = request.input('descripcion')
        await perfil.save()
        return{
            "Perfil": perfil,
            "msg": "Registro ingresado correctamente",
            "estado": 200
        }
    }

    public async index() {
        const perfils = await Perfil.query()
        return perfils
    }

    public async show({ params}: HttpContextContract){
        try{
            const perfil = await Perfil.find(params.id)
            if(perfil){
                return perfil
            } else{
                return("registro no existe")
            }
        } catch(error){
            console.log(error)}}

    public async update({request, params}: HttpContextContract){
        const perfil = await Perfil.find(params.id)
        if (perfil) {
            if (request.input('descripcion')!= 'Admin'&& request.input('descripcion')!='Dev'&&request.input('descripcion')!='Avg_user'){ /* Son los 3 tipos de perfiles permitidos*/
            return{
                "msg":"Error: tipo de perfil no existe"
                }
            } 
            perfil.descripcion = request.input('descripcion')
            if (await perfil.save()) {
                return {
                    "msg": "Actualizado correctamente",
                    perfil
                }
            }
            return ({
                "msg": "No se pudo actualizar",
                "estado": 401
            })
        }
        return({
            "msg": "registro no encontrado",
            "estado": 401
        })
    }
    public async eliminarPerfil({ request}: HttpContextContract){
        const id = request.param('id');
        await Perfil.query().where('id', id).delete();
        return("Registro eliminado");
    }
}
