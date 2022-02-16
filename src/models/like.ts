import { database } from '../database'
import { DataTypes, Model } from 'sequelize'

interface LikeAttributes {
  profile_id: number
  course_id: number
}

interface LikeInstance extends Model<LikeAttributes>, LikeAttributes { }

const Like = database.define<LikeInstance, LikeAttributes>('likes', {
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

export { Like }