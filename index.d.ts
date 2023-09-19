declare module '@plumbiu/github-info' {
  type User = Record<'name' | 'avatar' | 'created_at' | 'updated_at', string> &
    Record<
      'bio' | 'company' | 'blog' | 'location' | 'email' | 'twitter',
      string | null
    >
  type PublicRepos = Record<
    | 'id'
    | 'name'
    | 'fullName'
    | 'url'
    | 'description'
    | 'languate'
    | 'star'
    | 'wathers'
    | 'forks'
    | 'issue'
    | 'license'
    | 'created_at'
    | 'updated_at'
    | 'pushed_at',
    string
  > & {
    owner: {
      user: string | undefined
      avatar: string | undefined
    }
  }
  type Follow = Record<'id' | 'user' | 'avatar', string>
  type EventBase = Record<'id' | 'type' | 'created_at' | 'repo', string>
  type AvatarName = Record<'name' | 'avatar', string>
  type Commit = Record<'author' | 'message' | 'url', string>
  type PullRequestBase = Record<
    | 'html_url'
    | 'diff_url'
    | 'patch_url'
    | 'issue_url'
    | 'state'
    | 'locked'
    | 'title'
    | 'body'
    | 'created_at'
    | 'updated_at'
    | 'closed_at'
    | 'merged_by'
    | 'comments'
    | 'additions'
    | 'deletions'
    | 'changed_files',
    string
  > & {
    merged_at: string | undefined
  }
  type PullRequestUser = Record<'name' | 'avatar' | 'url', string | undefined>
  type PullRequestBase = Record<'label' | 'ref', string | undefined> & {
    user: PullRequestUser
  }
  type ReturnedType = User & {
    public_repos: PublicRepos[]
    followers: Follow[]
    following: Follow[]
    starred: PublicRepos[]
    events: EventBase & {
      org: AvatarName & {
        url: string
      }
      actor: AvatarName
      payload: {
        ref: string
        commits: Commit[]
      }
      pull_request?: PullRequestBase & {
        user: PullRequestUser
        head: PullRequestBase & {
          repo: Record<
            'name' | 'fullName' | 'description' | 'language' | 'license',
            string | undefined
          >
        }
        base: PullRequestBase
      }
    }
  }
  export async function profileInfo(username: stirng): Promise<ReturnedType>
}
