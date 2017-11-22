import React from 'react'

import SearchSummary from './searchSummary'
import SearchResult from './searchResult'

class SearchResultList extends React.Component {
  render () {
    const searchTerm = this.props.term
    console.log('search term is "%s"', searchTerm)
    let matchedResults = this.props.data.filter(function (row) {
      return row.name.toLowerCase().includes(searchTerm.toLowerCase())
    })

    const checkedFilters = this.props.filters.filter(filter => filter.checked)
    console.log(`${checkedFilters.length} checked filters: ${checkedFilters.map(o => o.attribute.label).join(',')}`)
    if (checkedFilters.length) {
      matchedResults = matchedResults.filter(row => {
        const attributeKeys = row.attributes.map(a => a.key)
        return checkedFilters.every(filter => attributeKeys.indexOf(filter.attribute.key) > -1)
      })
    }

    const results = matchedResults.map(result =>
      <tr>
        <td>
          <SearchResult name={result.name} restrictions={result.restrictions} attributes={result.attributes} sample={result.sample} />
        </td>
      </tr>
    )

    return (
      <div>
        <SearchSummary count={matchedResults.length} />
        <table className='table voice-search-results'>
          <tbody>
            {results}
          </tbody>
        </table>
      </div>
    )
  }
}

export default SearchResultList
