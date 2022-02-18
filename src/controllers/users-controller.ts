import { Response } from 'express'
import { RequestWithUser } from '../middlewares/auth'
import { userService } from '../services/user-service'

const usersController = {
  // GET /account
  show: async (req: RequestWithUser, res: Response) => {
    const account = req.user

    try {
      return res.json(account)
    } catch (err) {
      if (err instanceof Error) {
        return res.status(400).json({ message: err.message })
      }
    }
  },

  // PUT /account
  update: async (req: RequestWithUser, res: Response) => {
    const user = req.user
    const { first_name, last_name, phone, birth, email } = req.body

    if (!user) {
      return res.status(401).json({ message: 'Não autorizado!' })
    }

    try {
      const updatedUser = await userService.updateOne(user.id, {
        first_name,
        last_name,
        phone,
        birth,
        email
      })

      return res.json(updatedUser)
    } catch (err) {
      if (err instanceof Error) {
        return res.status(400).json({ message: err.message })
      }
    }
  },

  updatePassword: async (req: RequestWithUser, res: Response) => {
    const user = req.user
    const { password } = req.body

    if (!user) {
      return res.status(401).json({ message: 'Não autorizado!' })
    }

    try {
      await userService.updateOne(user.id, { password })
      return res.status(204).send()
    } catch (err) {
      if (err instanceof Error) {
        return res.status(400).json({ message: err.message })
      }
    }
  }
}

export { usersController }