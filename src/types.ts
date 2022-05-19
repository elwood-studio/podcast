import type { Meta, Episode } from 'podparse'

export type ShowInfo = Meta & {
  id: string
  slug: string
  platforms?: Array<{
    name: string
    url: string
  }>
}

export type EpisodeInfo = Episode & {
  showId: string
  slug: string
}
