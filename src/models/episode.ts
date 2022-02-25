import { database } from '../database'
import { DataTypes, Model, Optional } from 'sequelize'
import { WatchTimeInstance } from './watch-time'
import { CourseInstance } from './course'

interface EpisodeAttributes {
  id: number
  name: string
  synopsis: string
  order: number
  videoUrl: string
  secondsLong: number
  courseId: number
}

interface EpisodeCreationAttributes
  extends Optional<EpisodeAttributes, 'id' | 'videoUrl' | 'secondsLong' > {}

interface EpisodeInstance extends Model<EpisodeAttributes, EpisodeCreationAttributes>, EpisodeAttributes {
  course?: CourseInstance
  watchTime?: WatchTimeInstance
}

const Episode = database.define<EpisodeInstance, EpisodeAttributes>('episodes', {
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
  order: {
    allowNull: false,
    unique: true,
    type: DataTypes.STRING
  },
  videoUrl: {
    type: DataTypes.STRING
  },
  secondsLong: {
    type: DataTypes.INTEGER
  },
  courseId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    references: { model: 'courses', key: 'id' },
    onUpdate: 'CASCADE',
    onDelete: 'RESTRICT'
  }
})

export { Episode, EpisodeAttributes, EpisodeInstance }