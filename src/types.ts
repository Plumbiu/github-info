export type Follow = Record<'id' | 'login' | 'avatar_url', string>

type Owner = Record<'login' | 'avatar_url', string>
type License = Record<'name', string>

export type BaseField = Record<
  | 'login'
  | 'id'
  | 'node_id'
  | 'avatar_url'
  | 'gravatar_id'
  | 'url'
  | 'html_url'
  | 'followers_url'
  | 'following_url'
  | 'gists_url'
  | 'starred_url'
  | 'subscriptions_url'
  | 'organizations_url'
  | 'repos_url'
  | 'events_url'
  | 'received_events_url'
  | 'type'
  | 'site_admin'
  | 'name'
  | 'company'
  | 'blog'
  | 'location'
  | 'email'
  | 'hireable'
  | 'bio'
  | 'twitter_username'
  | 'public_repos'
  | 'public_gists'
  | 'followers'
  | 'following'
  | 'created_at'
  | 'updated_at',
  string
>

export type Star = Record<
  | 'id'
  | 'name'
  | 'full_name'
  | 'html_url'
  | 'description'
  | 'language'
  | 'stargazers_count'
  | 'watchers'
  | 'forks'
  | 'open_issues'
  | 'license'
  | 'created_at'
  | 'updated_at'
  | 'pushed_at',
  string
> & {
  license: License
  owner: Owner
}

export type Repo = Star

type Org = Record<'login' | 'url' | 'avatar_url', string>
type Actor = Record<'login' | 'avatar_url', string>
type BaseRepo = Record<'name' | 'url', string>
type PrUser = Record<'login' | 'avatar_url' | 'html_url', string>
type PrHeadorBase = Record<'label' | 'ref' | 'html_url', string> & {
  user: PrUser
  repo: Repo
}
type Pr = Record<
  | 'html_url'
  | 'diff_url'
  | 'patch_url'
  | 'issue_url'
  | 'state'
  | 'locked'
  | 'title'
  | 'created_at'
  | 'updated_at'
  | 'closed_at'
  | 'merged_at'
  | 'comments'
  | 'additions'
  | 'deletions'
  | 'changed_files'
  | 'body',
  string
> & {
  user: PrUser
  head: PrHeadorBase
  base: PrHeadorBase
  merged_by: {
    login: string
  }
}

interface Payload {
  ref: string
  pull_request?: Pr
  commits: Commit[]
}

type Commit = Record<'author' | 'message' | 'url', string>

export type Event = Record<'id' | 'type' | 'created_at', string> & {
  org: Org
  actor: Actor
  payload: Payload
  repo: BaseRepo
}
