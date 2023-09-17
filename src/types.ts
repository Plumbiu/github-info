export type NormalObj = Record<string, string>

export interface Sponsor {
  current: NormalObj
  past: NormalObj
}

export interface Contributions {
  amount: string
  full: Array<{
    date: string
    level: string
    count: string
  }>
  org: string[]
}

export interface Pinned {
  title: string
  desc: string
  language: string
  star: string
}

// TODO: try find a better way to get the profile infomation
export enum Profile {
  Bio = '.user-profile-bio > div',
  Follow = '.js-profile-editable-area a .color-fg-default',
  Details = '.vcard-detail',
  Organization = '.avatar-group-item',
  Sponsor = '#sponsors-section-list > div',
  Contributions = '.js-yearly-contributions',
  Pinned = '.js-pinned-items-reorder-form ol .pinned-item-list-item-content',
}
