module.exports = {
  user: 'admin',
  pass: process.env.VOICE_PASS,
  port: 3000,
  csvUrl: 'data/prod/voice-actors.csv',
  samplesUrl: 'data/prod/samples/',
  ftp: {
    host: process.env.VOICE_FTP_HOST,
    user: process.env.VOICE_FTP_USER,
    pass: process.env.VOICE_FTP_PASS
  }
}
