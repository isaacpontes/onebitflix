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
      //   primary80: '#FF0043',
      //   primary60: '#FF0043',
        primary40: '#FF0043',
      //   primary20: '#FF0043',
      //   grey100: '#FFF',
      //   grey80: '#EEE',
      //   grey60: '#DDD',
      //   grey40: '#454545',
      //   grey20: '#333333',
      //   bg: '#232323',
      //   white: '#151515',
      //   filterBg: '#DDD',
      //   filterInputBorder: '#FF0043',
      //   inputBorder: '#FF0043',
      //   accent: '#333333',
      //   highlight: '#0FF',
      //   hoverBg: '#FF0043dd'
      }
    }
  }
})

const adminJsRouter = AdminJsExpress.buildRouter(adminJs)

export { adminJs, adminJsRouter }