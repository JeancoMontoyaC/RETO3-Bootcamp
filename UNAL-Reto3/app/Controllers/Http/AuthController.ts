import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Perfil from 'App/Models/Perfil'
import User from 'App/Models/User'


export default class AuthController {
    public async login({auth, request, response}: HttpContextContract){

        const identificacion = request.input('identificacion');
        const password = request.input('password')
        try {
            const token = await auth.use('api').attempt(identificacion, password, {
                expiresIn: "60 mins",})
            return {
                token,
                "msg":"Usuario logueado correctamente"}
        } catch (error){
            return response.unauthorized('Incalid credentials')}}

    public async register({request, auth}: HttpContextContract) {
        const name= request.input('nombres')
        const apellidos = request.input('apellidos');
        const tipo_identificacion = request.input('tipo_identificacion');
        const identificacion = request.input('identificacion');
        const barrio = request.input('barrio');
        const direccion = request.input('direccion');
        const municipio = request.input('municipio');
        const departamento = request.input('departamento');
        const password = request.input('password')
        const tipo = request.input('perfil')  
        if (tipo!= 'Admin'&& tipo!='Dev'&&tipo!='User'){ 
            return{
                "msg":"Error: tipo de perfil no existe"}} 

        try{
            const usuarioExistente: number = await this.getValidarUsuarioExistente(identificacion)
                if (usuarioExistente === 0){
                    const perfil = new Perfil() 
                    perfil.descripcion = tipo
                    await perfil.save()
                    const usuario = new User()
                    usuario.nombres=name
                    usuario.apellidos=apellidos
                    usuario.tipo_identificacion=tipo_identificacion
                    usuario.identificacion=identificacion
                    usuario.barrio=barrio
                    usuario.direccion=direccion
                    usuario.municipio=municipio
                    usuario.departamento=departamento
                    usuario.password=password
                    usuario.perfil=perfil.id
                    await usuario.save()
                    const token = await auth.use('api').login(usuario, {
                        expiresIn: "10 days",})
    
                    return {
                        token,
                        "msg":"Usuario registrado correctamente"}
                } else {
                    return{
                    "msg":"Código usuario ya existe"}}            

        } catch (error) {
            console.log(error)
            return{
                "msg":"Error en el servidor"}}}

    private async getValidarUsuarioExistente(identificacion: number): Promise<number> {
        const total = await User.query().where({"identificacion":identificacion})
        return total.length}

    public async getListarUsuarios(): Promise<User[]> {
        const user = await User.all()
        return user;}

    public async buscarPorId({ request}: HttpContextContract){
        const identificacion = request.param('identificacion');
        const user = await User.find(identificacion);
        return user;}

    public async actualizarUsuario({request}: HttpContextContract){
        const id = request.param('identificacion');
        const user = request.all();
        await User.query().where('identificacion', id).update({
                nombres:user.nombres,
                apellidos:user.apellidos,
                tipo_identificacion:user.tipo_identificacion,
                identificacion:user.identificacion,
                barrio:user.barrio,
                direccion:user.direccion,
                municipio:user.municipio,
                departamento:user.departamento,
                password:user.password,
        });
        return("Registro actualizado")
    }

    public async eliminarUsuario({ request}: HttpContextContract){
        const id = request.param('id');
        await User.query().where('identificacion', id).delete();
        return("Registro eliminado");
    }
        
}
