import { basename, dirname, join } from 'path'

import type {
  GetStaticPathsResult,
  GetStaticPropsContext,
  GetStaticPropsResult,
} from 'next'
import { findAsync, exists, readAsync } from 'fs-jetpack'
import { parse } from 'yaml'
import slug from 'slug'

import Head from 'next/head'
import Image from 'next/image'

import type { ShowInfo, EpisodeInfo } from '../types'
import { compilePageMap } from '../library/compile-page-map'
import { Show } from '../components/show'

export type SlugPageProps = {
  type: 'show' | 'episode' | 'all-episodes'
  showInfo: ShowInfo
  episodeInfo?: EpisodeInfo
  recentEpisodes?: EpisodeInfo[]
  allEpisodes?: EpisodeInfo[]
}

export default function SlugPage(props: SlugPageProps) {
  const { showInfo, episodeInfo, recentEpisodes = [] } = props

  if (episodeInfo) {
    return <div>episode page</div>
  }

  return <Show info={showInfo} recentEpisodes={recentEpisodes} />
}

export async function getStaticPaths(): Promise<GetStaticPathsResult> {
  const dataFolder = process.env.dataDir ?? '/data'
  const pageMap = await compilePageMap(dataFolder)

  return {
    paths: Object.keys(pageMap),
    fallback: false,
  }
}

export async function getStaticProps(
  context: GetStaticPropsContext
): Promise<GetStaticPropsResult<SlugPageProps>> {
  const dataFolder = process.env.dataDir ?? '/data'
  const slugParam = context.params?.slug ?? []
  const slug = `/${(Array.isArray(slugParam) ? slugParam : [slugParam]).join(
    '/'
  )}`
  const pageMap = await compilePageMap(dataFolder)

  if (!Object.keys(pageMap).includes(slug)) {
    return {
      notFound: true,
    }
  }

  const props: SlugPageProps = {
    ...pageMap[slug],
  }

  const allEpisodes = Object.keys(pageMap)
    .filter((key) => {
      const item = pageMap[key]
      return item.showInfo.id === props.showInfo.id
    })
    .map((key) => {
      return pageMap[key].episodeInfo!
    })
    .filter(Boolean)

  allEpisodes.sort((a, b) => {
    return new Date(a.pubDate).getTime() - new Date(b.pubDate).getTime()
  })

  if (props.type === 'all-episodes') {
    props.allEpisodes = allEpisodes
  } else {
    props.recentEpisodes = allEpisodes.slice(0, 5)
  }

  return {
    props,
  }
}
