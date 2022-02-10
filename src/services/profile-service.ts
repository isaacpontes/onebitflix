import { Profile } from "../models"

const profileService = {
  create: async (name: string, avatar_url: string, user_id: number) => {
    const profile = await Profile.create({
      name,
      avatar_url,
      user_id
    })

    return profile
  }
}

export { profileService }