import type { Repo, Star } from '../types/index.js'

export async function fieldRequest<T>(url: string): Promise<T> {
  const raw = await fetch(url)
  const data = await raw.json()
  return data as T
}

export function destructStarOrRepoField(items: Star[] | Repo[]) {
  return items?.map((item) => ({
    id: item.id,
    name: item.name,
    fullName: item.full_name,
    url: item.html_url,
    description: item.description,
    language: item.language,
    star: item.stargazers_count,
    watchers: item.watchers,
    forks: item.forks,
    issue: item.open_issues,
    license: item.license?.name,
    created_at: item.created_at,
    updated_at: item.updated_at,
    pushed_at: item.pushed_at,
    owner: {
      user: item.owner?.login,
      avatar: item.owner?.avatar_url,
    },
  }))
}

interface User {
  login: string
  avatar_url: string
  html_url: string
  [key: string]: any
}

function destructUser(user: User) {
  const { login: name, avatar_url: avatar, html_url: url } = user
  return {
    name,
    avatar,
    url,
  }
}

export function destructPullRequest(pr: any) {
  const { merged_by, user, head, base } = pr
  const repo = head.repo

  return {
    html_url: pr.html_url,
    diff_url: pr.diff_url,
    patch_url: pr.patch_url,
    state: pr.state,
    locked: pr.locked,
    body: pr.body,
    created_at: pr.created_at,
    updated_at: pr.updated_at,
    closed_at: pr.closed_at,
    merged_at: {
      name: merged_by.login,
      url: merged_by.html_url,
    },
    merged_by: destructUser(merged_by),
    comments: pr.comments,
    additions: pr.additions,
    deletions: pr.deletions,
    changed_files: pr.changed_files,
    user: destructUser(user),
    head: {
      label: head.label,
      ref: head.ref,
      user: destructUser(head.user),
      repo: {
        name: repo.name,
        fullName: repo.full_name,
        description: repo.description,
        language: repo.language,
        license: repo.license.name,
      },
    },
    base: {
      label: base.label,
      ref: base.ref,
      user: destructUser(base.user),
    },
  }
}
