import {
  Page,
  getStaticPathsProvider,
  getStaticPropsProvider,
} from '@elwood-studio/distribute-react/nextjs'

import { template } from '../theme/template'

export default Page

export const getStaticPaths = getStaticPathsProvider(template)
export const getStaticProps = getStaticPropsProvider(template)
