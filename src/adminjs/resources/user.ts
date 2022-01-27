import { ResourceOptions } from "adminjs";

const userResourceOptions: ResourceOptions = {
  navigation: 'Accounts',
  properties: {
    birth: {
      type: 'date'
    },
    password: {
      type: 'password'
    },
    role: {
      availableValues: [
        { value: 'admin', label: 'Administrator' },
        { value: 'user', label: 'Standard User' }
      ]
    }
  },
  editProperties: [
    'first_name',
    'last_name',
    'phone',
    'birth',
    'email',
    'password',
    'role'
  ],
  filterProperties: [
    'first_name',
    'last_name',
    'phone',
    'birth',
    'email',
    'role',
    'created_at',
    'updated_at'
  ],
  listProperties: [
    'id',
    'first_name',
    'email',
    'role'
  ],
  showProperties: [
    'id',
    'first_name',
    'last_name',
    'phone',
    'birth',
    'email',
    'role',
    'created_at',
    'updated_at'
  ],
}

export { userResourceOptions }