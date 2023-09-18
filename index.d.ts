declare module '@plumbiu/github-info' {
  interface ReturnedType {
    name: string
    bio: string | null
    company: string | null
    blog: string | null
    location: string | null
    email: string | null
    avatar: string
    created_at: string
    updated_at: string
    twitter: string
    public_repos: Array<{
      id: string
      name: string
      fullName: string
      url: string
      description: string
      languate: string
      star: string
      wathers: string
      forks: string
      issue: string
      license: string
      created_at: string
      updated_at: string
      pushed_at: string
      owner: {
        user: string | undefined
        avatar: string | undefined
      }
    }>
    followers: Array<{
      id: string
      user: string
      avatar: string
    }>
    following: Array<{
      id: string
      user: string
      avatar: string
    }>
    starred: Array<{
      id: string
      name: string
      fullName: string
      url: string
      description: string
      language: string
      star: string
      watchers: string
      forks: string
      issue: string
      license: string
      created_at: string
      updated_at: string
      pushed_at: string
      owner: {
        user: string | undefined
        avatar: string | undefined
      }
    }>
    events: {
      id: string
      type: string
      created_at: string
      org: {
        name: string
        url: string
        avatar: string
      }
      actor: {
        name: string
        avatar: string
      }
      repo: {
        name: string
        url: string
      }
      payload: {
        ref: string
        commits: Array<{
          author: string
          message: string
          url: string
        }>
      }
      pull_request?: {
        html_url: string
        diff_url: string
        patch_url: string
        issue_url: string
        state: string
        locked: string
        title: string
        body: stirng
        created_at: stirng
        updated_at: stirng
        closed_at: stirng
        merged_by: stirng
        comments: stirng
        additions: stirng
        deletions: stirng
        changed_files: stirng
        merged_at: stirng | undefined
        user: {
          name: string | undefined
          avatar: string | undefined
          url: string | undefined
        }
        head: {
          label: string | undefined
          ref: string | undefined
          user: {
            name: string | undefined
            avatar: string | undefined
            url: string | undefined
          }
          repo: {
            name: string | undefined
            fullName: string | undefined
            description: string | undefined
            language: string | undefined
            license: string | undefined
          }
        }
        base: {
          label: string | undefined
          ref: string | undefined
          user: {
            name: string | undefined
            avatar: string | undefined
            url: string | undefined
          }
        }
      }
    }
  }
  export async function profileInfo(username: stirng): Promise<ReturnedType>
}
