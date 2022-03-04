import { database } from '../database'
import { DataTypes, Model } from 'sequelize'

interface LikeAttributes {
  userId: number
  courseId: number
}

interface LikeInstance extends Model<LikeAttributes>, LikeAttributes { }

const Like = database.define<LikeInstance, LikeAttributes>('likes', {
  userId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    references: { model: 'users', key: 'id' },
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