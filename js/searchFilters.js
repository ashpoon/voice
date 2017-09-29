import React from 'react';

class SearchFilters extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log('found %d filters', this.props.filters.length)
    return (
      <form className="voice-search-options">
      {this.props.filters.map(filter => (
        <label>
      		<input type="checkbox" class="voice-search-option" value={filter.key} /> {filter.label}
      	</label>
      ))}
      </form>
    )
  }
}

export default SearchFilters
