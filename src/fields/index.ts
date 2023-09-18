import type { Repo, Star, Event, BaseField, Follow } from '../types.js'
import { Octokit } from 'octokit'
import { fieldRequest } from '../utils.js'

// for cherrio
export async function initFields(username: string) {
  const octokit = new Octokit()
  const { data } = await octokit.request(`GET /users/${username}`)
  return {
    baseField() {
      return data as BaseField
    },
    async followersField() {
      const { followers_url } = data
      const followers = await fieldRequest<Follow[]>(followers_url)
      return followers?.map((item) => ({
        id: item.id,
        user: item.login,
        avatar: item.avatar_url,
      }))
    },
    async followingField() {
      // const { following_url } = data
      const following = await fieldRequest<Follow[]>(
        `https://api.github.com/users/${username}/following`,
      )
      return following?.map((item) => ({
        id: item.id,
        user: item.login,
        avatar: item.avatar_url,
      }))
    },
    async starredField() {
      // const { starred_url } = data
      const starred = await fieldRequest<Star[]>(
        `https://api.github.com/users/${username}/starred`,
      )
      return starred?.map((item) => {
        return {
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
        }
      })
    },
    async reposField() {
      const { repos_url } = data
      const repos = await fieldRequest<Repo[]>(repos_url)
      return repos?.map((item) => ({
        id: item.id,
        name: item.name,
        fullName: item.full_name,
        url: item.html_url,
        description: item.description,
        languate: item.language,
        star: item.stargazers_count,
        wathers: item.watchers,
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
    },
    async eventsField() {
      // const { events_url } = data
      const events = await fieldRequest<Event[]>(
        `https://api.github.com/users/${username}/events`,
      )
      return events?.map((item) => {
        const pr = item.payload?.pull_request
        const result = {
          id: item.id,
          type: item.type,
          created_at: item.created_at,
          org: {
            name: item.org?.login,
            url: item.org?.url,
            avatar: item.org?.avatar_url,
          },
          actor: {
            name: item.actor?.login,
            avatar: item.actor?.avatar_url,
          },
          repo: {
            name: item.repo.name,
            url: item.repo.url,
          },
          payload: {
            ref: item.payload.ref,
            commits: item.payload.commits?.map((commit) => ({
              author: commit.author,
              message: commit.message,
              url: commit.url,
            })),
          },
        }
        if (pr) {
          ;(result as any).pull_request = {
            html_url: pr.html_url,
            diff_url: pr.diff_url,
            patch_url: pr.patch_url,
            issue_url: pr.issue_url,
            state: pr.state,
            locked: pr.locked,
            title: pr.title,
            body: pr.body,
            created_at: pr.created_at,
            updated_at: pr.updated_at,
            closed_at: pr.closed_at,
            merged_at: pr.merged_at,
            merged_by: pr.merged_by?.login,
            comments: pr.comments,
            additions: pr.additions,
            deletions: pr.deletions,
            changed_files: pr.changed_files,
            user: {
              name: pr.user?.login,
              avatar: pr.user?.avatar_url,
              url: pr.user?.html_url,
            },
            head: {
              label: pr.head?.label,
              ref: pr.head?.ref,
              user: {
                name: pr.head?.user?.login,
                avatar: pr.head?.user?.avatar_url,
                url: pr.head?.user?.html_url,
              },
              repo: {
                name: pr.head?.repo?.name,
                fullName: pr.head?.repo?.full_name,
                description: pr.head?.repo?.description,
                language: pr.head?.repo?.language,
                license: pr.head?.repo?.license.name,
              },
            },
            base: {
              label: pr.base?.label,
              ref: pr.base?.ref,
              user: {
                name: pr.base?.user?.login,
                avatar: pr.base?.user?.avatar_url,
                url: pr.base?.user?.html_url,
              },
            },
          }
        }
        return result
      })
    },
  }
}
