import { ResourceOptions } from "adminjs";

const courseResourceOptions: ResourceOptions = {
  navigation: 'Catálogo',
  editProperties: ['name', 'synopsis', 'thumbnail', 'category_id'],
  filterProperties: ['name', 'synopsis', 'category_id', 'created_at', 'updated_at'],
  listProperties: ['id', 'name', 'category_id'],
  showProperties: ['id', 'name', 'synopsis', 'thumbnail_url', 'category_id', 'created_at', 'updated_at']
}

export { courseResourceOptions }