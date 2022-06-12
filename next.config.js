const { join } = require('path')
const { withDistribute } = require('@elwood-studio/distribute-react/next')

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true
}

module.exports = withDistribute(nextConfig, {
  dataDir: process.env.DATA_DIR ?? join(__dirname, 'data'),
})
