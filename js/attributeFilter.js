import Attribute from './attribute'

class AttributeFilter {
  constructor (columnHeader) {
    this.attribute = new Attribute(columnHeader)
    this.checked = false
  }
}

export default AttributeFilter
