import { Request, Response } from 'express'
import { jwtService } from '../services/jwt-service'
import { userService } from '../services/user-service'

const authController = {
  // POST /auth/register
  register: async (req: Request, res: Response) => {
    const { first_name, last_name, phone, birth, email, password } = req.body

    try {
      const userAlreadyExists = await userService.findByEmail(email)

      if (userAlreadyExists) {
        throw new Error('Este e-mail já está cadastrado.')
      }

      const user = await userService.create({
        first_name,
        last_name,
        phone,
        birth,
        email,
        password,
        role: 'user'
      })

      return res.status(201).json(user)
    } catch (err) {
      if (err instanceof Error) {
        return res.status(400).json({ message: err.message })
      }
    }
  },

  // POST /auth/login
  login: async (req: Request, res: Response) => {
    const { email, password } = req.body

    try {
      const user = await userService.findByEmail(email)

      if (!user) {
        return res.status(401).json({ message: 'E-mail não registrado' })
      }

      user.checkPassword(password, (err, isSame) => {
        if (err) {
          return res.status(400).json({ message: err.message })
        }

        if (!isSame) {
          return res.status(401).json({ message: 'Senha incorreta' })
        }

        const token = jwtService.signPayload({ email }, '7d')

        return res.json({ authenticated: true, token })
      })
    } catch (err) {
      if (err instanceof Error) {
        return res.status(400).json({ message: err.message })
      }
    }
  }
}

export { authController }