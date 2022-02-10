import { Category } from './category'
import { Course } from './course'
import { Episode } from './episode'
import { Profile } from './profile'
import { User } from './user'

Category.hasMany(Course)

Course.belongsTo(Category)
Course.hasMany(Episode)

Episode.belongsTo(Course)

Profile.belongsTo(User)

User.hasMany(Profile)

export {
  Category,
  Course,
  Episode,
  Profile,
  User
}