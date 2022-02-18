import { User } from '../models'
import { UserCreationAttributes } from '../models/user'

const userService = {
  findByEmail: async (email: string) => {
    const user = await User.findOne({
      attributes: ['id', 'first_name', 'last_name', 'phone', 'birth', 'email', 'password'],
      where: { email }
    })
    return user
  },

  create: async (attributes: UserCreationAttributes) => {
    const user = await User.create(attributes)
    return user
  },

  updateOne: async (
    id: string | number,
    values: {
      first_name?: string,
      last_name?: string,
      phone?: string,
      birth?: Date,
      email?: string,
      password?: string
    }
  ) => {
    const { first_name, last_name, phone, birth, email, password } = values

    const [affectedRows, updatedUsers] = await User.update({
      first_name,
      last_name,
      phone,
      birth,
      email,
      password
    }, {
      where: { id },
      individualHooks: true,
      returning: true
    })

    return updatedUsers[0]
  }
}

export { userService }