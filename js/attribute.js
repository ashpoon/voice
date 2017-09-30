const attributePrefix = '$'

class Attribute {
  constructor (key) {
    this.key = key
    this.label = key.substr(1).replace('_', ' ')
  }

  static isValidKey (str) {
    return str[0] === attributePrefix
  }
}

export default Attribute
