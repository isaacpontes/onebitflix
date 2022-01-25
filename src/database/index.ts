import { Sequelize } from 'sequelize'

const database = new Sequelize({
  dialect: 'postgres',
  host: 'localhost',
  port: 5432,
  database: 'onebitflix_development',
  username: 'onebitflix',
  password: 'onebitflix',
  define: {
    underscored: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
})

export { database }