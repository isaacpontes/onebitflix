import { database } from '../database'
import { DataTypes, Model, Optional } from 'sequelize'
import { EpisodeInstance } from './episode'

interface ProfileAttributes {
  id: number
  name: string
  avatarUrl: string
  userId: number
}

interface ProfileCreationAttributes extends Optional<ProfileAttributes, 'id' > {}

interface ProfileInstance extends Model<ProfileAttributes, ProfileCreationAttributes>, ProfileAttributes {
  episodes?: EpisodeInstance[]
}

const Profile = database.define<ProfileInstance, ProfileAttributes>('profiles', {
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
  avatarUrl: {
    type: DataTypes.STRING
  },
  userId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    references: { model: 'users', key: 'id' },
    onUpdate: 'CASCADE',
    onDelete: 'RESTRICT'
  }
})

export { Profile, ProfileInstance }