import jwt from 'jsonwebtoken'

const secret = 'chave-jwt'

const jwtService = {
  signPayload: (payload: string | object | Buffer, expiration: string) => {
    return jwt.sign(payload, secret, { expiresIn: expiration })
  },

  verifyToken: (token: string, callbackfn: jwt.VerifyCallback) => {
    jwt.verify(token, secret, callbackfn)
  }
}

export { jwtService }