import { Category } from './category'
import { Course } from './course'
import { Episode } from './episode'

Category.hasMany(Course)

Course.belongsTo(Category)
Course.hasMany(Episode)

Episode.belongsTo(Course)

export {
  Category,
  Course,
  Episode
}