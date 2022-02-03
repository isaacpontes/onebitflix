import { Category } from '../models'

const categoryService = {
  findAllPaginated: async (page: number, perPage: number) => {
    const offset = (page - 1) * perPage

    const categories = await Category.findAll({
      attributes: ['id', 'name', 'position'],
      order: [['position', 'ASC']],
      limit: perPage,
      offset
    })

    const total = await Category.count()

    return {
      categories,
      page,
      perPage,
      total
    }
  }
}

export { categoryService }