const https = require('https')
const { parse } = require('url')
const next = require('next')

const dev = process.env.NODE_ENV !== 'production'
const hostname = 'beatactivethailand.com'
const port = 3000
// when using middleware `hostname` and `port` must be provided below
const app = next({ dev, hostname, port })
const handle = app.getRequestHandler()

app.prepare().then(() => {
    let httpsOptions = {
        cert: fs.readFileSync('/home/beatactive/nodejs/ssl/certificate.crt'),
        ca: fs.readFileSync('/home/beatactive/nodejs/ssl/ca_bundle.crt'),
        key: fs.readFileSync('/home/beatactive/nodejs/ssl/private.key')
    };
    https.createServer(httpsOptions, async (req, res) => {
        try {

            // Be sure to pass `true` as the second argument to `url.parse`.
            // This tells it to parse the query portion of the URL.
            const parsedUrl = parse(req.url, true)
            const { pathname, query } = parsedUrl

            if (pathname === '/a') {
                await app.render(req, res, '/a', query)
            } else if (pathname === '/b') {
                await app.render(req, res, '/b', query)
            } else {
                await handle(req, res, parsedUrl)
            }
        } catch (err) {
            console.error('Error occurred handling', req.url, err)
            res.statusCode = 500
            res.end('internal server error')
        }
    }).listen(8080, '0.0.0.0', (err) => {
        if (err) throw err
        console.log(`> Ready on https://${hostname}:${port}`)
    })
})