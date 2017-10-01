const express = require('express')
const auth = require('basic-auth')

const config = {
  user: process.env.VOICE_USER || 'admin',
  pass: process.env.VOICE_PASS || 'doublespeak',
  port: process.env.VOICE_PORT || 3000,
  csvUrl: process.env.VOICE_CSV || 'data/voice-actors.csv',
  samplesUrl: process.env.VOICE_SAMPLES || 'data/samples/' // filenames in csv are all relative to this
}

var app = express()
app.set('views', './server')
app.set('view engine', 'ejs')

function authenticate (req, res, next) {
  var credentials = auth(req)
  console.log(credentials)
  if (!credentials || credentials.name !== config.user || credentials.pass !== config.pass) {
    res.status(401)
    res.header('WWW-Authenticate', 'Basic realm="voice"')
    res.send('Access denied')
  } else {
    next()
  }
}

app.get('/', authenticate, (req, res) => {
  res.render('index.ejs', config)
})

app.use(express.static('www'))
app.use('/data', express.static('data'))

app.listen(config.port, () => {
  console.log(`Voice app listening on port ${config.port}`)
})
