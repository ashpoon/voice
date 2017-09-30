import React from 'react'

function SearchFilter (props) {
  return (
    <label>
      <input type='checkbox' class='voice-search-option'
        onChange={props.onChange}
        checked={props.filter.checked}
        value={props.filter.attribute.key} /> {props.filter.attribute.label}
    </label>
  )
}

export default SearchFilter
