import type { AppProps } from 'next/app'
import Link from 'next/link'

import { useTemplateApp } from '@elwood-studio/distribute-nextjs'

import '@elwood-studio/distribute-react/dist/podcast.css'

import { template } from '../template'

export default useTemplateApp(template)
