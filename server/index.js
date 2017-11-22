const express = require('express')
const auth = require('basic-auth')
const samples = require('./samples')

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

// demo uses local samples
app.use('/data', express.static('data'))

// prod uses samples from FTP
app.get('/sample/:name', (req, res) => {
  if (!config.ftp) {
    return res.sendStatus(404)
  }

  const filename = req.params.name
  if (!filename) {
    return res.sendStatus(400)
  }

  samples.download(filename)
    .then(stream => stream.pipe(res))
    .catch(err => {
      console.error(err)
      res.sendStatus(500)
    })
})

app.use(express.static('www'))

app.listen(config.port, () => {
  console.log(`Voice app listening on port ${config.port}`)
})
