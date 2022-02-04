import { FeatureType, ResourceOptions } from 'adminjs'
import uploadFileFeature from '@adminjs/upload'
import path from 'path'

const courseResourceOptions: ResourceOptions = {
  navigation: 'Catálogo',
  editProperties: ['name', 'synopsis', 'upload_thumbnail', 'featured', 'category_id'],
  filterProperties: ['name', 'synopsis', 'featured', 'category_id', 'created_at', 'updated_at'],
  listProperties: ['id', 'name', 'featured', 'category_id'],
  showProperties: ['id', 'name', 'synopsis', 'featured', 'thumbnail_url', 'category_id', 'created_at', 'updated_at']
}

const courseResourceFeatures: FeatureType[] = [
  uploadFileFeature({
    provider: {
      local: {
        bucket: path.join(__dirname, '../../../public')
      }
    },
    properties: {
      key: 'thumbnail_url',
      file: 'upload_thumbnail'
    },
    uploadPath: (record, filename) => `thumbnails/course-${record.get('id')}/${filename}`
  })
]

export { courseResourceOptions, courseResourceFeatures }