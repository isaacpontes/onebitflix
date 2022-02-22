import { Category } from './category'
import { Course } from './course'
import { Episode } from './episode'
import { Favorite } from './favorite'
import { Like } from './like'
import { Profile } from './profile'
import { User } from './user'
import { WatchTime } from './watch-time'

Category.hasMany(Course)

Course.belongsTo(Category)
Course.hasMany(Episode)
Course.belongsToMany(Profile, { through: Favorite })
Course.belongsToMany(Profile, { through: Like })
Course.hasMany(Favorite, { as: 'favoritesProfiles', foreignKey: 'courseId' })

Episode.belongsTo(Course)
Episode.belongsToMany(Profile, { through: WatchTime })

Favorite.belongsTo(Course)
Favorite.belongsTo(Profile)

Profile.belongsTo(User)
Profile.belongsToMany(Course, { through: Favorite })
Profile.belongsToMany(Course, { through: Like })
Profile.belongsToMany(Episode, { through: WatchTime })
Profile.hasMany(Favorite, { as: 'favoritesCourses', foreignKey: 'profileId' })

User.hasMany(Profile)

export {
  Category,
  Course,
  Episode,
  Profile,
  User,
  WatchTime
}