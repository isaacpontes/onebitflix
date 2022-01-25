import AdminJs from 'adminjs'
import AdminJsExpress from '@adminjs/express'
import AdminJsSequelize from '@adminjs/sequelize'
import { database } from '../database'
import { adminJsResources } from '../adminjs/resources'

AdminJs.registerAdapter(AdminJsSequelize)

const adminJs = new AdminJs({
  databases: [database],
  resources: adminJsResources,
  rootPath: '/admin',
  branding: {
    companyName: 'OneBitFlix',
    logo: '/onebitflix.svg',
    theme: {
      colors: {
        primary100: '#FF0043',
        primary80: '#FF0043',
        primary60: '#FF0043',
        primary40: '#FF0043',
        primary20: '#FF0043',
        filterBg: '#333333',
        accent: '#151515',
        hoverBg: '#151515',
      }
    }
  }
})

const adminJsRouter = AdminJsExpress.buildRouter(adminJs)

export { adminJs, adminJsRouter }