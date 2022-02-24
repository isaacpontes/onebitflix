import { User } from '../models'
import { UserCreationAttributes } from '../models/user'

const userService = {
  findByEmail: async (email: string) => {
    const user = await User.findOne({
      attributes: [
        'id',
        ['first_name', 'firstName'],
        ['last_name', 'lastName'],
        'phone',
        'birth',
        'email',
        'password',
        'created_at'
      ],
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
      firstName?: string,
      lastName?: string,
      phone?: string,
      birth?: Date,
      email?: string,
      password?: string
    }
  ) => {
    const { firstName, lastName, phone, birth, email, password } = values

    const [affectedRows, updatedUsers] = await User.update({
      firstName,
      lastName,
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