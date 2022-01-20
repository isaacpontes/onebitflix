import { database } from '../database'
import { DataTypes, Model, Optional } from 'sequelize'

enum TitleCategoryEnum {
  MOVIE,
  SERIES
}

interface TitleAttributes {
  id: number
  name: string
  synopsis: string
  ageClassification: 'L' | '10' | '12' | '14' | '16' | '18' | '18r'
  thumbnailUrl: string
  category: TitleCategoryEnum
}

interface TitleCreationAttributes
  extends Optional<TitleAttributes, 'id' | 'thumbnailUrl' > {}

interface TitleInstance
  extends Model<TitleAttributes, TitleCreationAttributes>, TitleAttributes {}

const Title = database.define<TitleInstance, TitleAttributes>('titles', {
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
  ageClassification: {
    allowNull: false,
    type: DataTypes.STRING
  },
  thumbnailUrl: {
    type: DataTypes.STRING
  },
  category: {
    allowNull: false,
    type: DataTypes.INTEGER
  }
})

export { Title }