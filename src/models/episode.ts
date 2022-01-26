import { database } from '../database'
import { DataTypes, Model, Optional } from 'sequelize'

interface EpisodeAttributes {
  id: number
  name: string
  synopsis: string
  order: number
  video_url: string
  seconds_long: number
  course_id: number
}

interface EpisodeCreationAttributes
  extends Optional<EpisodeAttributes, 'id' > {}

interface EpisodeInstance
  extends Model<EpisodeAttributes, EpisodeCreationAttributes>, EpisodeAttributes {}

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
  video_url: {
    allowNull: false,
    type: DataTypes.STRING
  },
  seconds_long: {
    allowNull: false,
    type: DataTypes.INTEGER
  },
  course_id: {
    allowNull: false,
    type: DataTypes.INTEGER,
    references: { model: 'courses', key: 'id' },
    onUpdate: 'CASCADE',
    onDelete: 'RESTRICT'
  }
})

export { Episode }