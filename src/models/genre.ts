import { database } from '../database'
import { DataTypes, Model, Optional } from 'sequelize'

interface GenreAttributes {
  id: number
  name: string
  position: number
}

interface GenreCreationAttributes
  extends Optional<GenreAttributes, 'id'> {}

interface GenreInstance
  extends Model<GenreAttributes, GenreCreationAttributes>, GenreAttributes {}

const Genre = database.define<GenreInstance, GenreAttributes>('genres', {
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

export { Genre }