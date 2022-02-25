import { database } from '../database'
import { DataTypes, Model } from 'sequelize'

interface WatchTimeAttributes {
  seconds: number
  profileId: number
  episodeId: number
}

interface WatchTimeInstance extends Model<WatchTimeAttributes>, WatchTimeAttributes { }

const WatchTime = database.define<WatchTimeInstance, WatchTimeAttributes>('watch_times', {
  seconds: {
    allowNull: false,
    type: DataTypes.INTEGER
  },
  profileId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    references: { model: 'profiles', key: 'id' },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  },
  episodeId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    references: { model: 'episodes', key: 'id' },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  }
})

export { WatchTime, WatchTimeInstance }