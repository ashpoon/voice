import React from 'react'
import ReactDOM from 'react-dom'
import Papa from 'papaparse'

import SearchBox from './searchBox'
import SearchFilters from './searchFilters'
import SearchResultList from './searchResultList'

const searchOptionPrefix = '$'
const dataUrl = 'data/voice-actors.csv'

class Filter {
  constructor (columnHeader) {
    this.key = columnHeader.substr(1) // strip prefix
    this.label = this.key.replace('_', ' ')
    this.checked = false
  }
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
      const sortedData = results.data
        .map(item => {
          item.attributes = Object.keys(item)
            .filter(key => key[0] === searchOptionPrefix && item[key] === true)
            .map(key => key.substr(1))
          return item
        })
        .sort((a, b) => a.Name.localeCompare(b.Name))
      this.setState({ data: sortedData })

      const filters = this.prepareFilters(results.meta.fields)
      this.setState({ filters })
    })
  }

  prepareFilters (fields) {
    return fields
      .filter(function identifySearchOption (field) {
        return field[0] === searchOptionPrefix
      }).map(field => new Filter(field))
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
      return filter.key === filteredKey
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
