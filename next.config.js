const {join} = require('path')

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    dataDir: join(__dirname, 'data'),
  }
}

module.exports = nextConfig
