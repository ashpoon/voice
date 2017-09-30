import React from 'react'

function SearchBox (props) {
  return (
    <input type='text' className='voice-search-input form-control'
      placeholder='Search...' autoComplete='off' autofocus='true'
      value={props.value} onChange={props.onChange} />
  )
}

export default SearchBox
