import { Category } from './category'
import { Course } from './course'
import { Episode } from './episode'
import { Favorite } from './favorite'
import { Like } from './like'
import { Profile } from './profile'
import { User } from './user'

Category.hasMany(Course)

Course.belongsTo(Category)
Course.hasMany(Episode)
Course.belongsToMany(Profile, { through: Favorite })
Course.belongsToMany(Profile, { through: Like })
Course.hasMany(Favorite, { as: 'favorites_profiles', foreignKey: 'course_id' })

Episode.belongsTo(Course)

Favorite.belongsTo(Course)
Favorite.belongsTo(Profile)

Profile.belongsTo(User)
Profile.belongsToMany(Course, { through: Favorite })
Profile.belongsToMany(Course, { through: Like })
Profile.hasMany(Favorite, { as: 'favorites_courses', foreignKey: 'profile_id' })

User.hasMany(Profile)

export {
  Category,
  Course,
  Episode,
  Profile,
  User
}