export type Owner = Record<
  | 'login'
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
  | 'site_admin',
  string
> & {
  id: number
}

export type License = Record<
  'key' | 'name' | 'spdx_id' | 'url' | 'node_id',
  string
>

export type Org = Record<
  'login' | 'url' | 'gravatar_id' | 'avatar_url',
  string
> & {
  id: number
}
