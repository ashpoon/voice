module.exports = {
  user: process.env.VOICE_USER || 'admin',
  pass: process.env.VOICE_PASS || 'doublespeak',
  port: process.env.VOICE_PORT || 3000,
  csvUrl: process.env.VOICE_CSV || 'data/voice-actors.csv',
  samplesUrl: process.env.VOICE_SAMPLES || 'data/mp3/', // filenames in csv are all relative to this
  ftp: {
    host: process.env.VOICE_FTP_HOST,
    user: process.env.VOICE_FTP_USER,
    pass: process.env.VOICE_FTP_PASS
  }
}
