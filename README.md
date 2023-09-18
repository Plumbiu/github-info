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
  "name": "Guo Xingjun",
  "bio": "Studprogrammeried at Hangzhou Dianzi University (杭州电子科技大学) (HDU)，a front-end coder",
  "company": null,
  "blog": "https://blog.plumbiu.club/",
  "location": "Hang Zhou, China",
  "email": null,
  "avatar": "https://avatars.githubusercontent.com/u/99574369?v=4",
  "created_at": "2022-02-13T04:28:45Z",
  "updated_at": "2023-09-15T11:09:52Z",
  "twitter": null,
  "public_repos": [
    {
      "id": 595612212,
      "name": "aedes_mqtt",
      "fullName": "Plumbiu/aedes_mqtt",
      "url": "https://github.com/Plumbiu/aedes_mqtt",
      "description": "mqtt库aedes学习捏",
      "language": "JavaScript",
      "star": 0,
      "watchers": 0,
      "forks": 0,
      "issue": 0,
      "created_at": "2023-01-31T12:57:52Z",
      "updated_at": "2023-01-31T13:51:59Z",
      "pushed_at": "2023-01-31T14:10:33Z",
      "owner": {
        "user": "Plumbiu",
        "avatar": "https://avatars.githubusercontent.com/u/99574369?v=4"
      }
    },
    // ...
  ],
  "followers": [
    {
      "id": 132859519,
      "user": "Kudo233",
      "avatar": "https://avatars.githubusercontent.com/u/132859519?v=4"
    }
    // ...
  ],
  "following": [
    {
      "id": 132859519,
      "user": "Kudo233",
      "avatar": "https://avatars.githubusercontent.com/u/132859519?v=4"
    }
    // ...
  ],
  "starred": [
    {
      "id": 631194292,
      "name": "RN",
      "fullName": "Plumbiu/RN",
      "url": "https://github.com/Plumbiu/RN",
      "description": "React Native 学习捏~",
      "language": "JavaScript",
      "star": 1,
      "watchers": 1,
      "forks": 0,
      "issue": 0,
      "created_at": "2023-04-22T08:31:03Z",
      "updated_at": "2023-04-28T13:08:22Z",
      "pushed_at": "2023-05-01T00:58:26Z",
      "owner": {
        "user": "Plumbiu",
        "avatar": "https://avatars.githubusercontent.com/u/99574369?v=4"
      }
    }
    // ...
  ],

  "events": [
    {
      "id": "31907833252",
      "type": "PushEvent",
      "created_at": "2023-09-18T12:16:08Z",
      "org": {},
      "actor": {
        "name": "Plumbiu",
        "avatar": "https://avatars.githubusercontent.com/u/99574369?"
      },
      "repo": "Plumbiu/jobs",
      "payload": {
        "ref": "refs/heads/main",
        "commits": [
          {
            "author": { "email": "3434909403@qq.com", "name": "Plumbiu" },
            "message": "fix: fix build script"
          }
        ]
      }
    },
    {
      "id": "31898594603",
      "type": "PullRequestEvent",
      "created_at": "2023-09-18T05:41:05Z",
      "org": {
        "name": "truthRestorer",
        "avatar": "https://avatars.githubusercontent.com/u/141719708?"
      },
      "actor": {
        "name": "Plumbiu",
        "avatar": "https://avatars.githubusercontent.com/u/99574369?"
      },
      "repo": "truthRestorer/truth-cli",
      "payload": {},
      "pull_request": {
        "html_url": "https://github.com/truthRestorer/truth-cli/pull/69",
        "diff_url": "https://github.com/truthRestorer/truth-cli/pull/69.diff",
        "patch_url": "https://github.com/truthRestorer/truth-cli/pull/69.patch",
        "state": "closed",
        "locked": false,
        "body": "This PR was opened by the [Changesets release](https://github.com/changesets/action) GitHub action. When you're ready to do a release, you can merge this and the packages will be published to npm automatically. If you're not ready to do a release yet, that's fine, whenever you add more changesets to main, this PR will be updated.\n\n\n# Releases\n## truth-cli@1.3.3\n\n### Patch Changes\n\n-   37992150: 修复了节点无法展开问题\n",
        "created_at": "2023-09-18T05:31:41Z",
        "updated_at": "2023-09-18T05:41:04Z",
        "closed_at": "2023-09-18T05:41:04Z",
        "merged_at": { "name": "Plumbiu", "url": "https://github.com/Plumbiu" },
        "merged_by": { "url": "https://github.com/Plumbiu" },
        "comments": 1,
        "additions": 7,
        "deletions": 6,
        "changed_files": 3,
        "user": { "url": "https://github.com/apps/github-actions" },
        "head": {
          "label": "truthRestorer:changeset-release/main",
          "ref": "changeset-release/main",
          "user": { "url": "https://github.com/truthRestorer" },
          "repo": {
            "name": "truth-cli",
            "fullName": "truthRestorer/truth-cli",
            "description": "A command-line tool for analyzing dependencies under node_moudles",
            "language": "TypeScript",
            "license": "MIT License"
          }
        },
        "base": {
          "label": "truthRestorer:main",
          "ref": "main",
          "user": { "url": "https://github.com/truthRestorer" }
        }
      }
    },
    // ...
  ]
}
*/
```

## Todo

- `Field`:
  - [x] `bio`, `follow`, `sponsor`, `details`, `organizations`
  - [ ] `sponsorging`, `pinned`, `contributions` ...
  - [x] `activity`, `repositories`, `language-use` ...
  - [x] `stars`, `stars-list`, `hightlights`
- `API`:
  - [x] Single API
  - [ ] More API, eg `bioInfo`、`followInfo`....
