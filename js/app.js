import React from 'react';
import ReactDOM from 'react-dom';

import SearchBox from './searchBox';
import SearchResults from './searchResults';

const searchOptionPrefix = "$";

class VoiceApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = { data: [], searched: ''};
    this.loadData('data/voice-actors.csv');

    this.onSearchInput = this.onSearchInput.bind(this);
  }

  loadData(url) {
    Papa.parse(url, {
      download: true,
      header: true,
      dynamicTyping: true,
      skipEmptyLines: true,
      complete: results => {
        const sorted = results.data.sort(function (a, b) {
          return a.Name.localeCompare(b.Name);
        });
        console.log('done loading')
        console.log(results)
        this.setState({ data: sorted })
        // headers = results.meta.fields.filter(function identifySearchOption(field) {
        //   return field[0] === searchOptionPrefix;
        // }).map(function stripSearchOptionPrefix(field) {
        //   return field.substr(1)
        // });

        // displaySearchOptions(headers);
        // initInputs();
        // search();
      }
    });
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
