import { ResourceOptions } from "adminjs";

const episodeResourceOptions: ResourceOptions = {
  navigation: 'Catalogue',
  editProperties: ['name', 'synopsis', 'course_id', 'order', 'video_url', 'seconds_long'  ],
  filterProperties: ['name', 'synopsis', 'course_id', 'seconds_long', 'created_at', 'updated_at'],
  listProperties: ['id', 'name', 'course_id', 'order', 'seconds_long'],
  showProperties: ['id', 'name', 'synopsis', 'course_id', 'order', 'video_url', 'seconds_long', 'created_at', 'updated_at']
}

export { episodeResourceOptions }