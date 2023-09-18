/**
 * cherrio is not suitable for this repository
 * as the github API did not provide more data, I keep this code
 * @deprecated will remove in the next version
 */
import * as cheerio from 'cheerio'
import fetch from 'node-fetch'

type NormalObj = Record<string, string>

interface Sponsor {
  current: NormalObj
  past: NormalObj
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

interface Pinned {
  title: string
  desc: string
  language: string
  star: string
}

/*
  parse date like '2023-03-02'
*/
function parseDate(date1: string, date2: string) {
  if (date1 === date2) {
    return 0
  }
  const d1 = +date1.split('-').join('')
  const d2 = +date2.split('-').join('')
  return d1 - d2
}

/*
  init cheerio instance by using url
*/
export async function initCheerio(url: string) {
  const fetchJSON = await fetch(url)
  const html = await fetchJSON.text()
  return cheerio.load(html)
}

// TODO: try find a better way to get the profile infomation
export enum Profile {
  Organization = '.avatar-group-item',
  Sponsor = '#sponsors-section-list > div',
  Contributions = '.js-yearly-contributions',
  Pinned = '.js-pinned-items-reorder-form ol .pinned-item-list-item-content',
}

export async function cherrioField(username: string) {
  const $ = await initCheerio(`https://github.com/${username}`)
  // const $ = await initCheerio('http://127.0.0.1:5500/Plumbiu.html')
  return {
    organizationsField() {
      const organizations: NormalObj = {}
      $(Profile.Organization).each((_i, el) => {
        const key = $(el).attr('aria-label') as string
        organizations[key] = `https://github.com${$(el).attr('href')}`
      })
      return organizations
    },
    // TODO:full sponsors
    async sponsorField() {
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
    // TODO: full years
    contributionsField() {
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
