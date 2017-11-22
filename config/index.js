const configDir = process.env.NODE_ENV === 'production' ? './prod' : './demo'
console.log(`loading config from ${configDir}`)
module.exports = require(configDir)
