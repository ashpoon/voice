import React from 'react';
import ReactDOM from 'react-dom';

class SearchResult extends React.Component {
  constructor(props) {
    console.log(props)
    super(props);
  }

  render() {
    let sample = null
    if (this.props.sample) {
      sample = <audio src={'samples/' + this.props.sample} controls="controls">Your browser does not support audio tags</audio>
    }
    return (
      <tr>
        <td>
          <span class="search-result-body"><strong>{this.props.name}</strong> {this.props.headers}</span>
          <span class="search-result-audio">{sample}</span>
        </td>
      </tr>
    );
  }
}

// <span class="search-result-body"><strong>{this.props.name}</strong> {this.props.headers}</span>


export default SearchResult
