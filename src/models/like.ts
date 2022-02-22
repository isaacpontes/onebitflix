import { database } from '../database'
import { DataTypes, Model } from 'sequelize'

interface LikeAttributes {
  profileId: number
  courseId: number
}

interface LikeInstance extends Model<LikeAttributes>, LikeAttributes { }

const Like = database.define<LikeInstance, LikeAttributes>('likes', {
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

export { Like }