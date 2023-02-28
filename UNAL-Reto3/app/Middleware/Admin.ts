import { AuthenticationException } from '@adonisjs/auth/build/standalone'
import Perfil from 'App/Models/Perfil'

class Admin {
  async handle({auth }, next) {
    const user = await auth.user.perfil
    const perfil = await Perfil.find(user)
    if (!perfil?.descripcion || perfil?.descripcion != "Admin")
        throw new AuthenticationException(
            'Unauthorized access',
            'E_UNAUTHORIZED_ACCESS',
        )
    await next();
  }
}

module.exports = Admin;