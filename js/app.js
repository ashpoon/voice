import React from 'react';
import ReactDOM from 'react-dom';

import SearchResult from './searchResult';

const searchOptionPrefix = "$";

class VoiceApp extends React.Component {
  constructor(props) {
    super(props);
    // this.handleChange = this.handleChange.bind(this);
    this.state = { results: [], searched: ''};
    this.loadData('data/voice-actors.csv');
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
        this.setState({ results: sorted })
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

  handleChange(e) {
    this.setState({ text: e.target.value });
  }

  // <Search />
    // <form class="voice-search-options">
    //   {this.props.items.map(item => (
    //     <li key={item.id}>{item.text}</li>
    //   ))}
    //   <SearchFilter />
    // </form>

  render() {
    return (
      <div className="voice-app">
        <table className="table voice-search-results">
          <tbody>
            {this.state.results.map(result => {
              const resultHeaders = Object.keys(result)
                .map(key => {
                  if (key[0] === searchOptionPrefix && result[key] === true) {
                    return key.substr(1)
                  }
                }).filter(Boolean);
              return (
                <tr>
                  <td>
                    <SearchResult name={result.Name} headers={resultHeaders} sample={result.Sample} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
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
