import React from 'react'

function SearchResult (props) {
  const formattedAttributes = props.attributes.map(a => a.label).sort().join(', ')
  let sample = null
  if (props.sample) {
    sample = <audio className='search-result__audio' src={'samples/' + props.sample} controls='controls'>Your browser does not support audio tags</audio>
  }

  return (
    <div className='search-result'>
      <span className='search-result__body'><strong>{props.name}</strong> <span class='search-result__attr'>{formattedAttributes}</span></span>
      {sample}
    </div>
  )
}

export default SearchResult
