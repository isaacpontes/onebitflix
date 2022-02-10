import { Profile } from "../models"

const profileService = {
  create: async (name: string, avatar_url: string, user_id: number) => {
    const profilesCount = await Profile.count({ where: { user_id } })

    if (profilesCount >= 4) {
      throw new Error('Número máximo de perfis atingido')
    }

    const profile = await Profile.create({
      name,
      avatar_url,
      user_id
    })

    return profile
  }
}

export { profileService }