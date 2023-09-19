import type { License, Org, Owner } from './common.js'

export type Follow = Record<'id' | 'login' | 'avatar_url', string>

export type BaseField = Owner & Record<
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
  | 'node_id'
  | 'name'
  | 'full_name'
  | 'owner'
  | 'html_url'
  | 'description'
  | 'url'
  | 'forks_url'
  | 'keys_url'
  | 'collaborators_url'
  | 'teams_url'
  | 'hooks_url'
  | 'issue_events_url'
  | 'events_url'
  | 'assignees_url'
  | 'branches_url'
  | 'tags_url'
  | 'blobs_url'
  | 'git_tags_url'
  | 'git_refs_url'
  | 'trees_url'
  | 'statuses_url'
  | 'languages_url'
  | 'stargazers_url'
  | 'contributors_url'
  | 'subscribers_url'
  | 'subscription_url'
  | 'commits_url'
  | 'git_commits_url'
  | 'comments_url'
  | 'issue_comment_url'
  | 'contents_url'
  | 'compare_url'
  | 'merges_url'
  | 'archive_url'
  | 'downloads_url'
  | 'issues_url'
  | 'pulls_url'
  | 'milestones_url'
  | 'notifications_url'
  | 'labels_url'
  | 'releases_url'
  | 'deployments_url'
  | 'created_at'
  | 'updated_at'
  | 'pushed_at'
  | 'git_url'
  | 'ssh_url'
  | 'clone_url'
  | 'svn_url'
  | 'homepage'
  | 'language'
  | 'default_branch',
  string
> &
  Record<
    | 'private'
    | 'fork'
    | 'has_issues'
    | 'has_projects'
    | 'has_downloads'
    | 'has_wiki'
    | 'has_pages'
    | 'has_discussions'
    | 'mirror_url'
    | 'archived'
    | 'disabled'
    | 'allow_forking'
    | 'is_template'
    | 'web_commit_signoff_required',
    boolean
  > &
  Record<
    | 'id'
    | 'size'
    | 'stargazers_count'
    | 'watchers_count'
    | 'forks_count'
    | 'open_issues_count'
    | 'forks'
    | 'open_issues'
    | 'watchers',
    number
  > & {
    license: License
    owner: Owner
    topics: []
  }

export type Repo = Star

export type PullRequest = Record<
  | 'html_url'
  | 'diff_url'
  | 'patch_url'
  | 'issue_url'
  | 'state'
  | 'title'
  | 'created_at'
  | 'updated_at'
  | 'closed_at'
  | 'merged_at'
  | 'body',
  string
> &
  Record<
    'id' | 'comments' | 'additions' | 'deletions' | 'changed_files',
    number
  > & {
    user: PrUser
    head: PrHeadorBase
    base: PrHeadorBase
    locked: boolean
    merged_by: Record<
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
    >
  }

type Actor = Record<
  'login' | 'display_login' | 'gravatar_id' | 'url' | 'avatar_url',
  string
> & {
  id: number
}
type BaseRepo = Record<'name' | 'url', string> & {
  id: number
}
type PrUser = Record<'login' | 'avatar_url' | 'html_url', string>
type PrHeadorBase = Record<'label' | 'ref' | 'html_url', string> & {
  user: PrUser
  repo: Repo
}
type _Links = Record<
  | 'self'
  | 'html'
  | 'issue'
  | 'comments'
  | 'review_comments'
  | 'review_comment'
  | 'commits'
  | 'statuses',
  {
    href: string
  }
>

type PullRequestHeadOrBase = Record<'label' | 'ref' | 'sha', string> & {
  user: BaseField
  repo: Repo
}

type Payload = Record<
  'repository_id' | 'push_id' | 'size' | 'distinct_size',
  number
> &
  Record<'ref' | 'head' | 'before', string> & {
    commits: Commit[]
  } & {
    pull_request?: Record<
      | 'url'
      | 'node_id'
      | 'html_url'
      | 'diff_url'
      | 'patch_url'
      | 'issue_url'
      | 'state'
      | 'title'
      | 'body'
      | 'created_at'
      | 'updated_at'
      | 'closed_at'
      | 'merged_at'
      | 'merge_commit_sha'
      | 'commits_url'
      | 'review_comments_url'
      | 'review_comment_url'
      | 'comments_url'
      | 'statuses_url'
      | 'author_association'
      | 'mergeable_state',
      string
    > &
      Record<
        | 'id'
        | 'number'
        | 'comments'
        | 'review_comments'
        | 'commits'
        | 'additions'
        | 'deletions'
        | 'changed_files',
        number
      > &
      Record<'locked' | 'draft' | 'merged' | 'maintainer_can_modify', boolean> &
      Record<
        | 'assignee'
        | 'milestone'
        | 'auto_merge'
        | 'active_lock_reason'
        | 'mergeable'
        | 'rebaseable',
        string | null | boolean
      > & {
        _links: _Links
        head: PullRequestHeadOrBase
        base: PullRequestHeadOrBase
      }
  }

type Commit = Record<'sha' | 'message' | 'distinct' | 'url', string> & {
  author: Record<'email' | 'name', string>
}

export type Event = Record<'id' | 'type' | 'created_at', string> & {
  public: boolean
  org: Org
  actor: Actor
  payload: Payload
  repo: BaseRepo
}
