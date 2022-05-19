import { extname, join } from 'path'
import { URL } from 'url'

import axios from 'axios'
import invariant from 'ts-invariant'
import getPodcastFeed from 'podparse'
import { stringify as yamlStringify } from 'yaml'
import slug from 'slug'
import { writeAsync, dirAsync, removeAsync, exists } from 'fs-jetpack'

export async function main(args: string[]) {
  invariant(args.length === 1, 'Expected one argument')

  const dataFolder = join(__dirname, '..', 'data')

  const { data } = await axios.get(args[0])
  const feed = getPodcastFeed(data)
  const showSlug = slug(feed.meta.title)
  const showFolder = join(dataFolder, 'shows', showSlug)
  const episodesFolder = join(showFolder, 'episodes')

  await removeAsync(showFolder)
  await dirAsync(showFolder)

  await writeAsync(
    join(showFolder, `show.yml`),
    yamlStringify({ ...feed.meta, slug: showSlug })
  )

  await downloadFromUrl(feed.meta.image.url, join(showFolder, 'thumbnail'))

  for (const episode of feed.episodes.slice(0, 3)) {
    const episodeSlug = slug(episode.title)
    const episodeFolder = join(episodesFolder, episodeSlug)

    await writeAsync(
      join(episodeFolder, `episode.yml`),
      yamlStringify({ ...episode, slug: episodeSlug })
    )

    await Promise.all([
      downloadFromUrl(episode.image?.url, join(episodeFolder, `thumbnail`)),
      downloadFromUrl(episode.enclosure.url, join(episodeFolder, `enclosure`)),
    ])
  }
}

export async function downloadFromUrl(
  url: string | undefined,
  prefix: string
): Promise<void> {
  if (!url) {
    return
  }

  const { pathname } = new URL(url)
  const dest = `${prefix}${extname(pathname)}`

  if (!exists(dest)) {
    const { data } = await axios.get(url, {
      responseType: 'arraybuffer',
    })
    await writeAsync(dest, data)
  }
}

if (process.env.NO_EXECUTE !== 'true') {
  main(process.argv.slice(2))
}
