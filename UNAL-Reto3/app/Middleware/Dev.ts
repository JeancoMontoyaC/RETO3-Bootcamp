import { AuthenticationException } from '@adonisjs/auth/build/standalone'
import Perfil from 'App/Models/Perfil'

class Dev {
  async handle({auth }, next) {
    const user = await auth.user.perfil
    const perfil = await Perfil.find(user)
    if (!perfil?.descripcion || perfil?.descripcion != ("Admin" && "Dev")) 
        throw new AuthenticationException(
            'Unauthorized access',
            'E_UNAUTHORIZED_ACCESS',
        )
    await next();
  }
}

module.exports = Dev;