import jwt from 'jsonwebtoken'

const secret = 'chave-jwt'

const jwtService = {
  signPayload: (payload: string | object | Buffer, expiration: string) => {
    return jwt.sign(payload, secret, { expiresIn: expiration })
  },

  verifyToken: (token: string) => {
    return jwt.verify(token, secret)
  }
}

export { jwtService }