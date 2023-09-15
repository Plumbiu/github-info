import { initCheerio } from './utils.js'

// TODO: try find a better way to get the profile infomation
enum Profile {
  Bio = '.user-profile-bio > div',
  Follow = '.js-profile-editable-area a .color-fg-default',
  Details = '.vcard-detail',
  Organization = '.avatar-group-item',
  Sponsor = '#sponsors-section-list > div',
}

type NormalObj = Record<string, string>
/*
  get the profile infomation
*/
export async function profileInfo(user: string) {
  const $ = await initCheerio(`https://github.com/${user}`)
  const bio = $(Profile.Bio).text()
  // TODO: we can make every field into a function
  const follow: NormalObj = {}
  $(Profile.Follow).each((i, el) => {
    /*
      github profile page doesn't distinguish the followers and following field,
      so we use Index to indicate, may be we should find a better way.
    */
    const key = i === 0 ? 'followers' : 'following'
    follow[key] = $(el).text().replace(/\s|\n/g, '')
  })

  const details: NormalObj = {}
  $(Profile.Details).each((_i, el) => {
    const key = $(el).attr('itemprop') as string
    details[key] = $(el).text().replace(/\s|\n/g, '')
  })

  const organizations: NormalObj = {}
  $(Profile.Organization).each((_i, el) => {
    const key = $(el).attr('aria-label') as string
    organizations[key] = `https://github.com${$(el).attr('href')}`
  })

  const sponsor = await sponsorInfo(user)

  /*
    More filed to do:
    TODO: sponsorging, pinned, contributions, activity, repositories, language-use
    TODO: stars, stars-list, hightlights
  */
  return {
    bio,
    follow,
    sponsor,
    details,
    organizations,
  }
}

interface Sponsor {
  current: NormalObj
  past: NormalObj
}

/*
  get the spnsor infomation in the profile page
*/
export async function sponsorInfo(user: string) {
  /*
    It is difficlut to to get the sponfor infomation in the profile page
    as the class name in the label is duplicated
    and past sponsor will not show in the profile page.
  */
  const $ = await initCheerio(`https://github.com/sponsors/${user}`)
  const sponsor: Sponsor = {
    current: {},
    past: {},
  }
  $(Profile.Sponsor).each((i, rootEl) => {
    $(rootEl)
      .find('img')
      .each((_i, el) => {
        /*
          As the `follow` field,
          current and past sponsor doesn't indicated by the sponsor page
        */
        const prefix = i === 0 ? 'current' : 'past'
        const key = $(el).attr('alt')!
        sponsor[prefix][key] = $(el).attr('src')!
      })
  })
  return sponsor
}
