import {
  Page,
  getStaticPathsProvider,
  getStaticPropsProvider,
} from '@elwood-studio/distribute-react/next'

import { template } from '../template'

export default Page

export const getStaticPaths = getStaticPathsProvider(template)
export const getStaticProps = getStaticPropsProvider(template)
