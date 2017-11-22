const JSFtp = require('jsftp')
const config = require('../config')

function download (filename) {
  console.log('downloading', filename)
  return new Promise((resolve, reject) => {
    const ftp = new JSFtp(config.ftp)
    const remotePath = filename
    ftp.get(remotePath, (err, socket) => {
      if (err) {
        console.error(`failed to download ${filename}`)
        return reject(err)
      }
      resolve(socket)
    })
  })
}

module.exports = {
  download
}
