const JSFtp = require('jsftp')
const path = require('path')
const Promise = require('bluebird')
const config = require('../config')

// NOTE: JSFtp only opens 1 socket per connection, so open multiple clients for parallel downloads
// from command line: ftp mget *

const availableFtpClients = [
  newFtpClient(),
  newFtpClient(),
  newFtpClient(),
  newFtpClient(),
  newFtpClient()
]

listSamples().then(results => {
  console.log(`found ${results.length} samples on ftp server`)
  return Promise.map(results, downloadSample, { concurrency: 5 })
}).then(() => {
  console.log('all done', availableFtpClients.length)
  process.exit(0)
}).catch(err => {
  console.error(err)
  process.exit(1)
})

function newFtpClient () {
  if (!config.ftp.host) {
    throw new Error('config ftp host not set')
  }
  return new JSFtp(config.ftp)
}

function getFtpClient () {
  if (availableFtpClients.length) {
    return availableFtpClients.pop()
  }
  throw new Error('no available FTP clients')
}

function listSamples () {
  return new Promise((resolve, reject) => {
    const ftp = getFtpClient()
    ftp.ls('.', (err, results) => {
      if (err) {
        return reject(err)
      }
      availableFtpClients.push(ftp)
      return resolve(results.map(result => result.name))
    })
  })
}

function downloadSample (filename) {
  const remotePath = filename
  const localPath = path.join(process.cwd(), 'data', 'mp3', filename)
  console.log('downloading', localPath)
  return new Promise((resolve, reject) => {
    const ftp = getFtpClient()
    ftp.get(remotePath, localPath, (err) => {
      if (err) {
        console.error(`failed to download ${filename}`)
        return reject(err)
      }
      console.log('... done', filename)
      availableFtpClients.push(ftp)
      resolve()
    })
  })
}
