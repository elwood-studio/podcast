import { default as Link } from 'next/link'
import { Fragment } from 'react'

import { ShowInfo, EpisodeInfo } from '../types'
import { Layout } from './layout'

export type ShowProps = {
  info: ShowInfo
  recentEpisodes: EpisodeInfo[]
}

export function Show(props: ShowProps) {
  const { info, recentEpisodes = [] } = props

  return (
    <Layout>
      <div className="mx-auto grid max-w-7xl grid-cols-[1fr_2fr] gap-24 py-24">
        <div>
          <img src={info.image.url} className="w-full" />
        </div>
        <div>
          <h1 className="text-8xl font-extrabold">{info.title}</h1>
          <p className="mt-6 text-2xl leading-relaxed">{info.description}</p>

          <div className="mt-12 space-y-6">
            {recentEpisodes.map((item) => {
              return (
                <Fragment key={`Show-RecentEpisode-${item.title}`}>
                  <div>
                    <Link href={`/podcast/${info.slug}/episode/${item.slug}`}>
                      <a className="text-xl font-semibold">{item.title}</a>
                    </Link>
                    <p>{item.description}</p>
                  </div>
                </Fragment>
              )
            })}
          </div>
          <div className="mt-6">
            <Link href={`/podcast/${info.slug}/episode`}>
              <a>View All</a>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  )
}
