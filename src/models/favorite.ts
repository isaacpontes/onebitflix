import { database } from '../database'
import { DataTypes, Model } from 'sequelize'
import { CourseInstance } from './course'

interface FavoriteAttributes {
  profileId: number
  courseId: number
}

interface FavoriteInstance extends Model<FavoriteAttributes>, FavoriteAttributes {
  course?: CourseInstance
}

const Favorite = database.define<FavoriteInstance, FavoriteAttributes>('favorites', {
  profileId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    references: { model: 'profiles', key: 'id' },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  },
  courseId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    references: { model: 'courses', key: 'id' },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  }
})

export { Favorite }