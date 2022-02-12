import { database } from '../database'
import { DataTypes, Model } from 'sequelize'
import { CourseInstance } from './course'

interface FavoriteAttributes {
  profile_id: number
  course_id: number
}

interface FavoriteInstance extends Model<FavoriteAttributes>, FavoriteAttributes {
  course?: CourseInstance
}

const Favorite = database.define<FavoriteInstance, FavoriteAttributes>('favorites', {
  profile_id: {
    allowNull: false,
    type: DataTypes.INTEGER,
    references: { model: 'profiles', key: 'id' },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  },
  course_id: {
    allowNull: false,
    type: DataTypes.INTEGER,
    references: { model: 'courses', key: 'id' },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  }
})

export { Favorite }