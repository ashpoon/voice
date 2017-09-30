import React from 'react'
import SearchFilter from './searchFilter'

function SearchFilters (props) {
  console.log('rendering %d filters', props.filters.length)
  const filters = props.filters.map(filter => (
    <SearchFilter filter={filter} onChange={props.onChange} />
  ))
  return (
    <form className='voice-search-options'>
      {filters}
    </form>
  )
}

export default SearchFilters
