import express, { Request, Response } from 'express'

const router = express.Router()

router.get('/hello', (req: Request, res: Response) => {
  return res.json({ message: 'Hello, World!' })
})

export { router }