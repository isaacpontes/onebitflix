import { Sequelize } from 'sequelize'

const database = new Sequelize({
  dialect: 'postgres',
  host: 'localhost',
  port: 5432,
  database: 'onebitflix_development',
  username: 'onebitflix',
  password: 'onebitflix'
})

export { database }