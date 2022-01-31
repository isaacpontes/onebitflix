import AdminJs from 'adminjs'
import AdminJsExpress from '@adminjs/express'
import AdminJsSequelize from '@adminjs/sequelize'
import { database } from '../database'
import { adminJsResources } from '../adminjs/resources'
import { User } from '../models'
import bcrypt from 'bcrypt'
import { locale } from '../adminjs/locale'

AdminJs.registerAdapter(AdminJsSequelize)

const adminJs = new AdminJs({
  databases: [database],
  resources: adminJsResources,
  rootPath: '/admin',
  dashboard: {
    component: AdminJs.bundle('../adminjs/components/Dashboard'),
    handler: async (req, res, context) => {
      const resources = context._admin.resources.map(resource => {
        const id = resource.id()
        const translated = context._admin.translateLabel(id)

        return { id, translated }
      })

      res.json({
        resources
      })
    },
  },
  locale: locale,
  branding: {
    companyName: 'OneBitFlix',
    logo: '/onebitflix.svg',
    theme: {
      colors: {
        primary100: '#ff0043',
        primary80: '#ff1a57',
        primary60: '#ff3369',
        primary40: '#ff4d7c',
        primary20: '#ff668f',
        grey100: '#151515',
        grey80: '#333333',
        grey60: '#4d4d4d',
        grey40: '#666666',
        grey20: '#dddddd',
        filterBg: '#333333',
        accent: '#151515',
        hoverBg: '#151515',
      }
    }
  }
})

const adminJsRouter = AdminJsExpress.buildAuthenticatedRouter(adminJs, {
  authenticate: async (email, password) => {
    const user = await User.findOne({ where: { email } })

    if (user && user.role === 'admin') {
      const matched = await bcrypt.compare(password, user.password)

      if (matched) {
        return user
      }
    }

    return false
  },
  cookiePassword: 'senha-do-cookie'
})

export { adminJs, adminJsRouter }