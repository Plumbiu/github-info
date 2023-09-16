# @plumbiu/github-info

> get the github profile infomation by API!

## Installing

```bash
npm install @plumbiu/github-info
```

## Usage

```js
import { profileInfo } from '@plumbiu/github-info'

const profile = await profileInfo('Plumbiu')
/*
  {
    bio: 'Studprogrammeried at Hangzhou Dianzi University (杭州电子科技大学) (HDU)，a front-end coder',
    follow: { followers: '16', following: '15' },
    sponsor: {
      current: {},
      past: {}
    },
    details: {
      homeLocation: 'HangZhou,China',
      localTime: '23:55(UTC+08:00)',
      url: 'https://blog.plumbiu.club/'
    },
    organizations: {
      hduhelp: 'https://github.com/hduhelp',
      IdeaLeap: 'https://github.com/IdeaLeap',
      truthRestorer: 'https://github.com/truthRestorer'
    }
  }
*/
```

## Todo

- `Field`:
  - [x] `bio`, `follow`, `sponsor`, `details`, `organizations`
  - [x] `sponsorging`, `pinned`, `contributions` ...
  - [ ] `activity`, `repositories`, `language-use` ...
  - [ ] `stars`, `stars-list`, `hightlights`
- `API`:
  - [x] Single API
  - [ ] More API, eg `bioInfo`、`followInfo`....
