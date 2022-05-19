import { basename, dirname, join } from 'path'

import { findAsync, exists } from 'fs-jetpack'
import slug from 'slug'

import { readYamlFile } from './read-yaml'
import { ShowInfo, EpisodeInfo } from '../types'

export type PageMap = Record<
  string,
  {
    type: 'show' | 'episode' | 'all-episodes'
    showInfo: ShowInfo
    episodeInfo?: EpisodeInfo
  }
>

export async function compilePageMap(dataDir: string): Promise<PageMap> {
  const dataFolder = dataDir
  const showsFolder = join(dataFolder, 'shows')

  const showFiles = await findAsync(showsFolder, { matching: '*/show.yml' })
  const paths: PageMap = {}

  for (const showFile of showFiles) {
    const showId = basename(dirname(showFile))
    const showEpisodesFolder = join(showsFolder, showId, 'episodes')

    // if there's now shows for this episode, just stop here
    if (!exists(showEpisodesFolder)) {
      continue
    }

    const showInfo = await readYamlFile<ShowInfo>(showFile)
    const episodeInfoFiles = await findAsync(showEpisodesFolder, {
      matching: '*/episode.yml',
    })
    const showSlug = slug(showInfo.slug ?? showId)

    paths[`/podcast/${showSlug}`] = {
      type: 'show',
      showInfo,
    }

    for (const episodeInfoFile of episodeInfoFiles) {
      const episodeInfo = await readYamlFile<EpisodeInfo>(episodeInfoFile)
      const episodeSlug = slug(
        episodeInfo.slug ??
          episodeInfo.title ??
          basename(dirname(episodeInfoFile))
      )

      paths[`/podcast/${showSlug}/episode/${episodeSlug}`] = {
        type: 'episode',
        showInfo,
        episodeInfo,
      }
    }
  }

  return paths
}
