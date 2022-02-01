import AdminJs from 'adminjs'
import AdminJsExpress from '@adminjs/express'
import AdminJsSequelize from '@adminjs/sequelize'
import { database } from '../database'
import { adminJsResources } from '../adminjs/resources'
import { locale } from '../adminjs/locale'
import { dashboardOptions } from '../adminjs/dashboard'
import { brandingOptions } from '../adminjs/branding'
import { authtenticationOptions } from '../adminjs/authentication'

AdminJs.registerAdapter(AdminJsSequelize)

const adminJs = new AdminJs({
  databases: [database],
  resources: adminJsResources,
  rootPath: '/admin',
  dashboard: dashboardOptions,
  locale: locale,
  branding: brandingOptions
})

const adminJsRouter = AdminJsExpress.buildAuthenticatedRouter(adminJs, authtenticationOptions)

export { adminJs, adminJsRouter }