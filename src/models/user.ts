import { database } from '../database'
import { DataTypes, Model, Optional } from 'sequelize'
import bcrypt from 'bcrypt'

type CheckPasswordCallback = (err: Error | undefined, isSame: boolean) => void

interface UserAttributes {
  id: number
  first_name: string
  last_name: string
  phone: string
  birth: Date
  email: string
  password: string
  role: 'admin' | 'user'
}

interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}

interface UserInstance extends Model<UserAttributes, UserCreationAttributes>, UserAttributes {
  checkPassword: (password: string, callbackfn: CheckPasswordCallback) => void
}

const User = database.define<UserInstance, UserAttributes>('users', {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  first_name: {
    allowNull: false,
    type: DataTypes.STRING
  },
  last_name: {
    allowNull: false,
    type: DataTypes.STRING
  },
  phone: {
    allowNull: false,
    type: DataTypes.STRING
  },
  birth: {
    allowNull: false,
    type: DataTypes.DATE
  },
  email: {
    allowNull: false,
    unique: true,
    type: DataTypes.STRING,
    validate: {
      isEmail: true
    }
  },
  password: {
    allowNull: false,
    type: DataTypes.INTEGER
  },
  role: {
    allowNull: false,
    type: DataTypes.STRING
  }
}, {
  hooks: {
    beforeSave: async (user) => {
      if (user.isNewRecord || user.changed('password')) {
        user.password = await bcrypt.hash(user.password.toString(), 10);
      }
    }
  }
})

User.prototype.checkPassword = function (password: string, callbackfn: (err: Error | undefined, isSame: boolean) => void) {
  bcrypt.compare(password, this.password, (err, isSame) => {
    if (err) {
      callbackfn(err, false)
    } else {
      callbackfn(err, isSame)
    }
  })
}

export { User, UserCreationAttributes, UserInstance }