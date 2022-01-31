import { FeatureType, ResourceOptions } from 'adminjs'
import uploadFileFeature from '@adminjs/upload'
import path from 'path'

const courseResourceOptions: ResourceOptions = {
  navigation: 'Catálogo',
  editProperties: ['name', 'synopsis', 'upload_thumbnail', 'category_id'],
  filterProperties: ['name', 'synopsis', 'category_id', 'created_at', 'updated_at'],
  listProperties: ['id', 'name', 'category_id'],
  showProperties: ['id', 'name', 'synopsis', 'thumbnail_url', 'category_id', 'created_at', 'updated_at']
}

const courseResourceFeatures: FeatureType[] = [
  uploadFileFeature({
    provider: {
      local: {
        bucket: path.join(__dirname, '../../../uploads')
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