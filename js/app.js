import React from 'react'
import ReactDOM from 'react-dom'
import Papa from 'papaparse'

import Attribute from './attribute'
import AttributeFilter from './attributeFilter'
import SearchBox from './searchBox'
import SearchFilters from './searchFilters'
import SearchResultList from './searchResultList'

const dataUrl = window.voiceConfig.dataUrl
if (!dataUrl) {
  throw new Error('no data url specified')
}

class VoiceApp extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      searched: '',
      filters: [],
      data: []
    }

    this.onSearchInput = this.onSearchInput.bind(this)
    this.onSearchFilter = this.onSearchFilter.bind(this)
  }

  componentDidMount () {
    this.loadData(dataUrl, results => {
      const data = results.data
        .map(item => ({
          name: item.Name,
          sample: item.Sample,
          attributes: Object.keys(item)
            .filter(key => Attribute.isValidKey(key) && item[key] === true)
            .map(key => new Attribute(key))
        }))
        .sort((a, b) => a.name.localeCompare(b.name))

      const filters = results.meta.fields
        .filter(Attribute.isValidKey)
        .map(field => new AttributeFilter(field))
        // NOTE-DZH: do not sort because eg male/female should be consecutive
      this.setState({ filters, data })
    })
  }

  loadData (url, done) {
    return Papa.parse(url, {
      download: true,
      header: true,
      dynamicTyping: true,
      skipEmptyLines: true,
      complete: done
    })
  }

  onSearchInput (event) {
    this.setState({ searched: event.target.value })
  }

  onSearchFilter (event) {
    const filteredKey = event.target.value
    const updated = this.state.filters.map(filter => {
      return filter.attribute.key === filteredKey
        ? Object.assign(filter, { checked: !filter.checked })
        : filter
    })
    this.setState({ filters: updated })
  }

  render () {
    return (
      <div className='voice-app'>
        <SearchBox value={this.state.searched} onChange={this.onSearchInput} />
        <SearchFilters filters={this.state.filters} onChange={this.onSearchFilter} />
        <SearchResultList term={this.state.searched} filters={this.state.filters} data={this.state.data} />
      </div>
    )
  }
}

ReactDOM.render(<VoiceApp />, document.getElementById('root'))
