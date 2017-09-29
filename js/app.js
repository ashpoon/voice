import React from 'react';
import ReactDOM from 'react-dom';
import Papa from 'papaparse';

import SearchBox from './searchBox';
import SearchResults from './searchResults';

const searchOptionPrefix = "$";
const dataUrl = 'data/voice-actors.csv';

class VoiceApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = { data: [], searched: ''};
    this.onSearchInput = this.onSearchInput.bind(this);
  }

  componentDidMount() {
    this.loadData(dataUrl, results => {
      const sorted = results.data.sort((a, b) => a.Name.localeCompare(b.Name));
      console.log(results)
      this.setState({ data: sorted })
    })
  }

  loadData(url, done) {
    return Papa.parse(url, {
      download: true,
      header: true,
      dynamicTyping: true,
      skipEmptyLines: true,
      complete: done
    })

        // headers = results.meta.fields.filter(function identifySearchOption(field) {
        //   return field[0] === searchOptionPrefix;
        // }).map(function stripSearchOptionPrefix(field) {
        //   return field.substr(1)
        // });

        // displaySearchOptions(headers);
  }

  onSearchInput(searched) {
    this.setState({ searched });
    // FIXME: introduce SearchResults and use this.state.searched to influence them
  }

  // <form class="voice-search-options">
  //   {this.props.items.map(item => (
  //     <li key={item.id}>{item.text}</li>
  //   ))}
  //   <SearchFilter />
  // </form>

  render() {
    return (
      <div className="voice-app">
        <SearchBox value={this.state.searched} onChange={this.onSearchInput} />
        <SearchResults term={this.state.searched} data={this.state.data} />
      </div>
    );
  }

}
//
// class Search extends React.Component {
//   render() {
//     <input onChange={this.handleChange} value={this.state.text} />
//     return <input type="search" onChange={} class="voice-search-input form-control" placeholder="Search..." autocomplete="off">;
//   }
// }

ReactDOM.render(<VoiceApp/>, document.getElementById('root'));
