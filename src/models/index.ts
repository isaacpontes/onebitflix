import { Category } from './category'
import { Course } from './course'
import { Episode } from './episode'
import { Favorite } from './favorite'
import { Profile } from './profile'
import { User } from './user'

Category.hasMany(Course)

Course.belongsTo(Category)
Course.hasMany(Episode)
Course.belongsToMany(Profile, { through: Favorite })
Course.hasMany(Favorite, { as: 'favorites_profiles', foreignKey: 'course_id' })

Episode.belongsTo(Course)

Favorite.belongsTo(Course)

Profile.belongsTo(User)
Profile.belongsToMany(Course, { through: Favorite })

User.hasMany(Profile)

export {
  Category,
  Course,
  Episode,
  Profile,
  User
}