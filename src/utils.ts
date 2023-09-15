import * as cheerio from 'cheerio'

/*
  init cheerio instance by using url
*/
export async function initCheerio(url: string) {
  const fetchJSON = await fetch(url)
  const html = await fetchJSON.text()
  return cheerio.load(html)
}
