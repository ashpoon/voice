module.exports = {
  user: 'admin',
  pass: process.env.VOICE_PASS,
  port: 3000,
  csvUrl: process.env.VOICE_CSV,
  samplesUrl: '/sample/',
  ftp: {
    host: process.env.VOICE_FTP_HOST,
    user: process.env.VOICE_FTP_USER,
    pass: process.env.VOICE_FTP_PASS
  }
}
