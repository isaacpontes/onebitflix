import path from 'path'
import uploadFileFeature from '@adminjs/upload'
import { FeatureType, ResourceOptions } from 'adminjs'

const episodeResourceOptions: ResourceOptions = {
  navigation: 'Catálogo',
  editProperties: ['name', 'synopsis', 'course_id', 'order', 'upload_video', 'seconds_long'  ],
  filterProperties: ['name', 'synopsis', 'course_id', 'seconds_long', 'created_at', 'updated_at'],
  listProperties: ['id', 'name', 'course_id', 'order', 'seconds_long'],
  showProperties: ['id', 'name', 'synopsis', 'course_id', 'order', 'video_url', 'seconds_long', 'created_at', 'updated_at']
}

const episodeResourceFeatures: FeatureType[] = [
  uploadFileFeature({
    provider: {
      local: {
        bucket: path.join(__dirname, '../../../uploads')
      }
    },
    properties: {
      key: 'video_url',
      file: 'upload_video'
    },
    uploadPath: (record, filename) => `videos/course-${record.get('course_id')}/${filename}`
  })
]

export {
  episodeResourceOptions,
  episodeResourceFeatures
}