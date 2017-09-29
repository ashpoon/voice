import React from 'react'

import SearchSummary from './searchSummary'
import SearchResult from './searchResult'

class SearchResults extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      results: []
    }
  }

  render () {
    console.log('search term is "%s"; filters are %s', this.props.term, this.props.filters)
    const searchTerm = this.props.term
    const matched = this.props.data.filter(function (row) {
      return row.Name.toLowerCase().includes(searchTerm.toLowerCase())
    })

    // FIXME: also handle filters
    return (
      <div>
        <SearchSummary count={matched.length} />
        <table className='table voice-search-results'>
          <tbody>
            {matched.map(result => {
              return (
                <tr>
                  <td>
                    <SearchResult name={result.Name} headers={[]} sample={result.Sample} />
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    )
  }
}

/*
const resultHeaders = Object.keys(result)
  .map(key => {
    if (key[0] === searchOptionPrefix && result[key] === true) {
      return key.substr(1)
    }
  }).filter(Boolean);
*/

export default SearchResults
