import React from 'react'

const samplesUrl = window.voiceConfig.samplesUrl
if (!samplesUrl) {
  throw new Error('no samples url specified')
}

function SearchResult (props) {
  const formattedAttributes = props.attributes.map(a => a.label).sort().join(', ')
  let sample = null
  if (props.sample) {
    sample = <audio className='search-result__audio' preload='false' src={samplesUrl + props.sample} controls='controls'>Your browser does not support audio tags</audio>
  }

  return (
    <div className='search-result'>
      <span className='search-result__body'><strong>{props.name}</strong> <span class='search-result__attr'>{formattedAttributes}</span></span>
      {sample}
    </div>
  )
}

export default SearchResult
