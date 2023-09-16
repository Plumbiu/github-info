import * as cheerio from 'cheerio'

/*
  init cheerio instance by using url
*/
export async function initCheerio(url: string) {
  const fetchJSON = await fetch(url)
  const html = await fetchJSON.text()
  return cheerio.load(html)
}

/*
  parse date like '2023-03-02'
*/
export function parseDate(date1: string, date2: string) {
  if (date1 === date2) {
    return 0
  }
  const d1 = +date1.split('-').join('')
  const d2 = +date2.split('-').join('')
  return d1 - d2
}
