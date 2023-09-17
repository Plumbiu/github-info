import type { ProfileInfo, Options } from './src/index'
import type { NormalObj, Contributions, Sponsor, Pinned } from './src/types'

declare function profileInfo(
  username: string,
  options?: Options,
): Promise<ProfileInfo>

declare function initFields(username: string): Promise<{
  bioField: () => string
  followField: () => NormalObj
  detailsField: () => NormalObj
  organizationsField: () => NormalObj
  sponsorField: () => Promise<Sponsor>
  contributionsField: () => Contributions
  pinnedField: () => Pinned[]
}>
