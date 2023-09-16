declare function profileInfo(user: string): Promise<{
  bio: string
  follow: NormalObj
  sponsor: Sponsor
  details: NormalObj
  organizations: NormalObj
  contributions: Contributions
  pinned: Pinned[]
}>
