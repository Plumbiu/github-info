import { initFields } from './fields.js'

/*
  get the profile infomation
*/
export async function profileInfo(username: string) {
  const {
    userField: baseField,
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
  } = await baseField()

  const followers = await followersField()
  const following = await followingField()
  const starred = await starredField()
  const repos = await reposField()
  const events = await eventsField()
  /*
    More filed to do:
    TODO: sponsor, organizations,contributions,pinned
  */
  return {
    name,
    bio,
    company,
    blog,
    location,
    email,
    avatar,
    created_at,
    updated_at,
    twitter,
    public_repos: repos,
    followers,
    following,
    starred,
    events,
  }
}

// void profileInfo('Plumbiu').then(async (data) => {
//   const { writeFileSync } = await import('node:fs')
//   writeFileSync('./Plumbiu.json', JSON.stringify(data))
//   console.log(typeof data)
// })
