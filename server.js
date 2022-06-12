// server.js
const { createServer } = require('http')
const { parse } = require('url')
const next = require('next')
const log = require('next/dist/build/output/log')

const {
    createDistributeRequestHandler,
} = require('@elwood-studio/distribute-react/next')

const dev = process.env.NODE_ENV !== 'production'
const hostname = 'localhost'
const port = 3000
const app = next({ dev, hostname, port })
const distributeHandle = createDistributeRequestHandler(app)

app.prepare().then(() => {
    createServer(async (req, res) => {
        try {
            await distributeHandle(req, res)
        } catch (err) {
            console.error('Error occurred handling', req.url, err)
            res.statusCode = 500
            res.end('internal server error')
        }
    }).listen(port, (err) => {
        if (err) throw err
        log.info(`Ready on http://${hostname}:${port}`)
    })
})
