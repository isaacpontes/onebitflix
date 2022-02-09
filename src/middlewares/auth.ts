import { NextFunction, Request, Response } from 'express'
import { JwtPayload } from 'jsonwebtoken'
import { UserInstance } from '../models/user'
import { jwtService } from '../services/jwt-service'
import { userService } from '../services/user-service'

interface RequestWithUser extends Request {
  user?: UserInstance | null
}

async function ensureAuth(req: RequestWithUser, res: Response, next: NextFunction) {
  const authorizationHeader = req.headers.authorization

  if (!authorizationHeader) {
    return res.status(401).json({ message: 'Não autorizado: nenhum token encontrado' })
  }

  const token = authorizationHeader.replace(/Bearer /, '')

  jwtService.verifyToken(token, (err, decoded) => {
    if (err || typeof decoded === 'undefined') {
      return res.status(401).json({ message: 'Não autorizado: token inválido' })
    }

    userService.findByEmail((decoded as JwtPayload).email).then(user => {
      req.user = user
      next()
    })
  })
}

export { ensureAuth }