const express = require('express')
const auth = require('basic-auth')
const pkg = require('../package.json')
const config = require('../config')

const app = express()
app.set('views', './server')
app.set('view engine', 'ejs')

function authenticate (req, res, next) {
  const credentials = auth(req)
  if (!credentials || credentials.name !== config.user || credentials.pass !== config.pass) {
    res.status(401)
    res.header('WWW-Authenticate', 'Basic realm="voice"')
    res.send('Access denied')
  } else {
    next()
  }
}
app.use(authenticate)

app.get('/', (req, res) => {
  const { csvUrl, samplesUrl } = config
  res.render('index.ejs', { csvUrl, samplesUrl, version: pkg.version })
})

app.use(express.static('www'))
app.use('/data', express.static('data'))

app.listen(config.port, () => {
  console.log(`Voice app listening on port ${config.port}`)
})
