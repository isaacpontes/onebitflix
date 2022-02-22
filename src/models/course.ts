import { database } from '../database'
import { DataTypes, Model, Optional } from 'sequelize'

interface CourseAttributes {
  id: number
  name: string
  synopsis: string
  thumbnailUrl: string
  featured: boolean
  categoryId: number
}

interface CourseCreationAttributes
  extends Optional<CourseAttributes, 'id' | 'thumbnailUrl' | 'featured' > {}

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
  thumbnailUrl: {
    type: DataTypes.STRING
  },
  featured: {
    defaultValue: false,
    type: DataTypes.BOOLEAN
  },
  categoryId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    references: { model: 'categories', key: 'id' },
    onUpdate: 'CASCADE',
    onDelete: 'RESTRICT'
  }
})

export { Course, CourseInstance }