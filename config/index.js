const configDir = process.env.VOICE_CONFIG || './demo'

console.log(`loading config from ${configDir}`)

module.exports = require(configDir)
