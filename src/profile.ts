import { initFields } from './fields/index.js'

/*
  get the profile infomation
*/
export async function profileInfo(username: string) {
  const {
    baseField,
    followersField,
    followingField,
    starredField,
    reposField,
    eventsField,
  } = await initFields(username)
  // TODO: we can make every field into a function
  const {
    bio,
    name,
    company,
    blog,
    location,
    email,
    avatar_url: avatar,
    twitter_username: twitter,
    created_at,
    updated_at,
  } = baseField()

  const followers = await followersField()
  const following = await followingField()
  const starred = await starredField()
  const repos = await reposField()
  const events = await eventsField()
  // const organizations = organizationsField()
  // const sponsor = await sponsorField()
  // const contributions = contributionsField()
  // const pinned = pinnedField()
  /*
    More filed to do:
    TODO: sponsorging, language-use
  */
  return {
    name,
    bio,
    company,
    blog,
    location,
    email,
    public_repos: repos,
    followers,
    following,
    avatar,
    starred,
    created_at,
    updated_at,
    twitter,
    // sponsor,
    events,
    // organizations,
    // contributions,
    // pinned,
  }
}

// void profileInfo('Plumbiu').then(async (data) => {
//   const { writeFileSync } = await import('node:fs')
//   writeFileSync('./Plumbiu.json', JSON.stringify(data))
//   console.log(typeof data)
// })
