import React from 'react'

function SearchResult (props) {
  const formattedAttributes = props.attributes.map(prettifyOptionKey).sort().join(', ')
  let sample = null
  if (props.sample) {
    sample = <audio src={'samples/' + props.sample} controls='controls'>Your browser does not support audio tags</audio>
  }

  return (
    <div className='search-result'>
      <span className='search-result-body'><strong>{props.name}</strong> {formattedAttributes}</span>
      <span className='search-result-audio'>{sample}</span>
    </div>
  )
}

function prettifyOptionKey (key) {
  return key.replace('_', ' ')
}

export default SearchResult
