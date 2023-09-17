import { initFields } from './fields/index.js'
import type { Contributions, NormalObj, Pinned, Sponsor } from './types.js'

export interface ProfileInfo {
  bio?: string
  follow?: NormalObj
  sponsor?: Sponsor
  details?: NormalObj
  organizations?: NormalObj
  contributions?: Contributions
  pinned?: Pinned[]
}

export type Options = Record<keyof ProfileInfo, boolean>

/*
  get the profile infomation
*/
export async function profileInfo(
  username: string,
  options: Options = {
    bio: true,
    follow: true,
    sponsor: true,
    details: true,
    organizations: true,
    contributions: false,
    pinned: false,
  },
): Promise<ProfileInfo> {
  const {
    bio: _bio,
    follow: _follow,
    sponsor: _sponsor,
    details: _details,
    organizations: _organizations,
    contributions: _contributions,
    pinned: _pinned,
  } = options
  const {
    bioField,
    followField,
    detailsField,
    organizationsField,
    sponsorField,
    pinnedField,
    contributionsField,
  } = await initFields(username)
  let bio
  if (_bio) {
    bio = bioField()
  }
  // TODO: we can make every field into a function
  let follow: NormalObj | undefined
  if (_follow) {
    follow = followField()
  }

  let details: NormalObj | undefined
  if (_details) {
    details = detailsField()
  }

  let organizations: NormalObj | undefined
  if (_organizations) {
    organizations = organizationsField()
  }

  let sponsor: Sponsor | undefined
  if (_sponsor) {
    sponsor = await sponsorField()
  }

  let contributions: Contributions | undefined
  if (_contributions) {
    contributions = contributionsField()
  }

  let pinned: Pinned[] | undefined
  if (_pinned) {
    pinned = pinnedField()
  }
  /*
    More filed to do:
    TODO: sponsorging, activity, repositories, language-use
    TODO: stars, stars-list, hightlights
  */
  return {
    bio,
    follow,
    sponsor,
    details,
    organizations,
    contributions,
    pinned,
  }
}

// void profileInfo('Plumbiu').then(async (data) => {
//   const { writeFileSync } = await import('node:fs')
//   writeFileSync('./Plumbiu.json', JSON.stringify(data))
//   console.log(data)
// })
