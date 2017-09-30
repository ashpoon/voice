import React from 'react'

import SearchSummary from './searchSummary'
import SearchResult from './searchResult'

class SearchResultList extends React.Component {
  render () {
    const searchTerm = this.props.term
    console.log('search term is "%s"', searchTerm)
    let matched = this.props.data.filter(function (row) {
      return row.Name.toLowerCase().includes(searchTerm.toLowerCase())
    })

    const checkedOptions = this.props.filters.filter(filter => filter.checked)
    console.log(`${checkedOptions.length} checked filters: ${checkedOptions.map(o => o.label).join(',')}`)
    if (checkedOptions.length) {
      matched = matched.filter(row => {
        return checkedOptions.every(checkedOption => row.attributes.includes(checkedOption.key))
      })
    }

    const results = matched.map(result =>
      <tr>
        <td>
          <SearchResult name={result.Name} attributes={result.attributes} sample={result.Sample} />
        </td>
      </tr>
    )

    return (
      <div>
        <SearchSummary count={matched.length} />
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
