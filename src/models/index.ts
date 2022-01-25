import { Category } from './category'
import { Course } from './course'

Category.hasMany(Course)

Course.belongsTo(Category)

export {
  Course,
  Category
}