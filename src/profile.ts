import { initCheerio, parseDate } from './utils.js'

// TODO: try find a better way to get the profile infomation
enum Profile {
  Bio = '.user-profile-bio > div',
  Follow = '.js-profile-editable-area a .color-fg-default',
  Details = '.vcard-detail',
  Organization = '.avatar-group-item',
  Sponsor = '#sponsors-section-list > div',
  Contributions = '.js-yearly-contributions',
  Pinned = '.js-pinned-items-reorder-form ol .pinned-item-list-item-content',
}

interface Pinned {
  title: string
  desc: string
  language: string
  star: string
}

interface Contributions {
  amount: string
  full: Array<{
    date: string
    level: string
    count: string
  }>
  org: string[]
}

type NormalObj = Record<string, string>
/*
  get the profile infomation
*/
export async function profileInfo(user: string) {
  // const $ = await initCheerio(`http://127.0.0.1:5500/${user}.html`)
  const $ = await initCheerio(`https://github.com/${user}`)
  const bio = $(Profile.Bio).text()
  // TODO: we can make every field into a function
  // follow: {
  //   followers: '2.9k',
  //   floowing: '175'
  // }
  const follow: NormalObj = {}
  $(Profile.Follow).each((i, el) => {
    /*
      github profile page doesn't distinguish the followers and following field,
      so we use Index to indicate, may be we should find a better way.
    */
    const key = i === 0 ? 'followers' : 'following'
    follow[key] = $(el).text().replace(/\s|\n/g, '')
  })
  // details: {
  //   homeLocation: 'Hangzhou,China',
  //   url: 'https://blog.plumbiu.club'
  //   ...
  // }
  const details: NormalObj = {}
  $(Profile.Details).each((_i, el) => {
    const key = $(el).attr('itemprop') as string
    details[key] = $(el).text().replace(/\s|\n/g, '')
  })
  // organizations: {
  //   vuejs: 'https://github.com/vuejs',
  //   vitejs: 'https://github.com/vitejs',
  //   ...
  // }
  const organizations: NormalObj = {}
  $(Profile.Organization).each((_i, el) => {
    const key = $(el).attr('aria-label') as string
    organizations[key] = `https://github.com${$(el).attr('href')}`
  })
  // sponsor: {
  //   current: {
  //     '@wey-gu': 'https://avatars.githubusercontent.com/u/1651790?s=60&v=4',
  //     '@sodatea': 'https://avatars.githubusercontent.com/u/3277634?s=60&v=4',
  //      ...
  //   },
  //   past: {
  //     '@element-plus': 'https://avatars.githubusercontent.com/u/68583457?s=60&v=4',
  //     '@kallydev': 'https://avatars.githubusercontent.com/u/36319157?s=60&v=4'
  //      ...
  //   }
  // },
  const sponsor = await sponsorInfo(user)
  // contributions: {
  //   amount: '2499',
  //   full: [
  //     { date: '2022-9-11', level: '1', count: '5' },
  //     { date: '2022-9-11', level: '1', count: '5' },
  //     ...
  //   ]
  // }
  const contributions: Contributions = {
    amount: '0',
    full: [],
    org: [],
  }
  $(Profile.Contributions).each((_i, rootEl) => {
    // contributions amount
    contributions.amount = /[\d,]+/
      .exec($(rootEl).find('h2').text())![0]
      .replace('', '')
    // date contributions information
    $(rootEl)
      .find('td')
      .each((_i, el) => {
        const elm = $(el)
        const date = elm.attr('data-date')
        const level = elm.attr('data-level') ?? '0'
        let count = elm.text().split(' ')[0]
        if (!Number(count)) {
          count = '0'
        }
        if (date) {
          contributions.full.push({
            date,
            level,
            count,
          })
        }
      })
    $(rootEl)
      .find('.js-org-filter-link')
      .each((_i, el) => {
        const text = $(el).text()
        if (text) {
          contributions.org.push(text.trim())
        }
      })
    contributions.full.sort((a, b) => {
      return parseDate(a.date, b.date)
    })
  })

  const pinned: Pinned[] = []
  $(Profile.Pinned).each((_i, rootEl) => {
    const pin: Pinned = {
      title: '',
      desc: '',
      language: '',
      star: '',
    }
    $(rootEl)
      .find('.pinned-item-desc')
      .each((_i, el) => {
        pin.desc = $(el).text().replace(/\n/g, '').trim()
      })
    $(rootEl)
      .find('.wb-break-word')
      .each((_i, el) => {
        pin.title = $(el).text().trim()
      })
    $(rootEl)
      .find('span')
      .attr('itemprop', 'programmingLanguage')
      .each((_i, el) => {
        pin.language = $(el).text()
      })
    $(rootEl)
      .find('.pinned-item-meta')
      .each((_i, el) => {
        pin.star =
          $(el)
            .text()
            .replace(/[\s\n]/g, '') || '0'
      })
    pinned.push(pin)
  })
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
  const sponsor: Sponsor = {
    current: {},
    past: {},
  }
  try {
    const $ = await initCheerio(`https://github.com/sponsors/${user}`)
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
  } finally {
    // eslint-disable-next-line no-unsafe-finally
    return sponsor
  }
}

// void profileInfo('Plumbiu').then(async (data) => {
//   const { writeFileSync } = await import('node:fs')
//   writeFileSync('./Plumbiu.json', JSON.stringify(data))
//   console.log(data)
// })
