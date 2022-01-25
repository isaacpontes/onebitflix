import { database } from '../database'
import { DataTypes, Model, Optional } from 'sequelize'

interface CategoryAttributes {
  id: number
  name: string
  position: number
}

interface CategoryCreationAttributes
  extends Optional<CategoryAttributes, 'id'> {}

interface CategoryInstance
  extends Model<CategoryAttributes, CategoryCreationAttributes>, CategoryAttributes {}

const Category = database.define<CategoryInstance, CategoryAttributes>('categories', {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  name: {
    allowNull: false,
    type: DataTypes.STRING
  },
  position: {
    allowNull: false,
    unique: true,
    type: DataTypes.INTEGER
  }
})

export { Category }