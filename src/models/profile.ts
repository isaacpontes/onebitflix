import { database } from '../database'
import { DataTypes, Model, Optional } from 'sequelize'

interface ProfileAttributes {
  id: number
  name: string
  avatar_url: string
  user_id: number
}

interface ProfileCreationAttributes extends Optional<ProfileAttributes, 'id' > {}

interface ProfileInstance
  extends Model<ProfileAttributes, ProfileCreationAttributes>, ProfileAttributes {}

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
  avatar_url: {
    type: DataTypes.STRING
  },
  user_id: {
    allowNull: false,
    type: DataTypes.INTEGER,
    references: { model: 'users', key: 'id' },
    onUpdate: 'CASCADE',
    onDelete: 'RESTRICT'
  }
})

export { Profile, ProfileInstance }