import type { Repo, Star, Event, BaseField, Follow } from '../types/index.js'
import { Octokit } from 'octokit'
import { destructPullRequest, destructStarOrRepoField, fieldRequest } from '../utils.js'

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
      return destructStarOrRepoField(starred)
    },
    async reposField() {
      const { repos_url } = data
      const repos = await fieldRequest<Repo[]>(repos_url)
      return destructStarOrRepoField(repos)
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
            avatar: item.org?.avatar_url,
          },
          actor: {
            name: item.actor?.login,
            avatar: item.actor?.avatar_url,
          },
          repo: item.repo.name,
          payload: {
            ref: item.payload.ref,
            commits: item.payload.commits?.map((commit) => ({
              author: commit.author,
              message: commit.message,
            })),
          },
        }
        if (pr) {
          ;(result as any).pull_request = destructPullRequest(pr)
        }
        return result
      })
    },
  }
}
