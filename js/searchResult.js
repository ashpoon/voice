import React from 'react';
import ReactDOM from 'react-dom';

class SearchResult extends React.Component {
  constructor(props) {
    super(props);
    this.formattedHeaders = this.props.headers.map(prettifyOptionKey).sort().join(', ')
  }

  render() {
    let sample = null
    if (this.props.sample) {
      sample = <audio src={'samples/' + this.props.sample} controls="controls">Your browser does not support audio tags</audio>
    }
    return (
      <div className="search-result">
        <span className="search-result-body"><strong>{this.props.name}</strong> {this.formattedHeaders}</span>
        <span className="search-result-audio">{sample}</span>
      </div>
    );
  }
}

function prettifyOptionKey(key) {
  return key.replace("_", " ");
}

export default SearchResult
