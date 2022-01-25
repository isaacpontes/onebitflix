import { database } from '../database'
import { DataTypes, Model, Optional } from 'sequelize'

interface CourseAttributes {
  id: number
  name: string
  synopsis: string
  thumbnail_url: string
  category_id: number
}

interface CourseCreationAttributes
  extends Optional<CourseAttributes, 'id' | 'thumbnail_url' > {}

interface CourseInstance
  extends Model<CourseAttributes, CourseCreationAttributes>, CourseAttributes {}

const Course = database.define<CourseInstance, CourseAttributes>('courses', {
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
  synopsis: {
    allowNull: false,
    type: DataTypes.TEXT
  },
  thumbnail_url: {
    type: DataTypes.STRING
  },
  category_id: {
    allowNull: false,
    type: DataTypes.INTEGER,
    references: { model: 'categories', key: 'id' },
    onUpdate: 'CASCADE',
    onDelete: 'RESTRICT'
  }
})

export { Course }