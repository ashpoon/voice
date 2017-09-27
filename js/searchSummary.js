import React from 'react';
import ReactDOM from 'react-dom';

class SearchSummary extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <p class="voice-search-summary">Matched {this.props.count} {maybePlural('actor', this.props.count)}:</p>
  }
}

function maybePlural(singular, count) {
	return count === 1 ? singular : singular + "s";
}

export default SearchSummary
