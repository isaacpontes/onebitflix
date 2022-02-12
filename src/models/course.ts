import { database } from '../database'
import { DataTypes, Model, Optional } from 'sequelize'

interface CourseAttributes {
  id: number
  name: string
  synopsis: string
  thumbnail_url: string
  featured: boolean
  category_id: number
}

interface CourseCreationAttributes
  extends Optional<CourseAttributes, 'id' | 'thumbnail_url' | 'featured' > {}

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
  featured: {
    defaultValue: false,
    type: DataTypes.BOOLEAN
  },
  category_id: {
    allowNull: false,
    type: DataTypes.INTEGER,
    references: { model: 'categories', key: 'id' },
    onUpdate: 'CASCADE',
    onDelete: 'RESTRICT'
  }
})

export { Course, CourseInstance }