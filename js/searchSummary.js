import React from 'react'

function SearchSummary (props) {
  return <p class='voice-search-summary'>Matched {props.count} {maybePlural('actor', props.count)}:</p>
}

function maybePlural (singular, count) {
  return count === 1 ? singular : singular + 's'
}

export default SearchSummary
