import express from 'express'
import { router } from './routes'
import { adminJs, adminJsRouter } from './config/adminjs'

const app = express()

app.use(express.static('public'))

app.use(router)
app.use(adminJs.options.rootPath, adminJsRouter)

const PORT = process.env.port || 3000

app.listen(PORT, () => {
  console.log(`Server started successfuly at port ${PORT}`)
})