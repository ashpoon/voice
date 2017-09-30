import React from 'react'

function SearchSummary (props) {
  const matchedMessage = `Matched ${props.count} ${maybePlural('actor', props.count)}`
  if (props.count === 0) {
    return <p class='voice-search-summary'>{matchedMessage}. Please double check your filters.</p>
  }
  return <p class='voice-search-summary'>{matchedMessage}:</p>
}

function maybePlural (singular, count) {
  return count === 1 ? singular : singular + 's'
}

export default SearchSummary
