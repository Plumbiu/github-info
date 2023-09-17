import type { Contributions, NormalObj, Pinned, Sponsor } from '../types.js'
import { Profile } from '../types.js'
import { initCheerio, parseDate } from '../utils.js'

export async function initFields(username: string) {
  const $ = await initCheerio(`https://github.com/${username}`)
  // const $ = await initCheerio(`http://127.0.0.1:5500/${username}.html`)
  return {
    bioField() {
      return $(Profile.Bio).text()
    },
    followField() {
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
      return follow
    },
    detailsField() {
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
      return details
    },
    organizationsField() {
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
      return organizations
    },
    async sponsorField() {
      /*
        It is difficlut to to get the sponfor infomation in the profile page
        as the class name in the label is duplicated
        and past sponsor will not show in the profile page.
      */
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
      const sponsor: Sponsor = {
        current: {},
        past: {},
      }
      try {
        const $ = await initCheerio(`https://github.com/sponsors/${username}`)
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
    },
    contributionsField() {
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
      return contributions
    },
    pinnedField() {
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
      return pinned
    },
  }
}
