import React from 'react';
import ReactDOM from 'react-dom';
import Papa from 'papaparse';

import SearchBox from './searchBox';
import SearchFilters from './searchFilters';
import SearchResults from './searchResults';

const searchOptionPrefix = "$";
const dataUrl = 'data/voice-actors.csv';

class VoiceApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searched: '',
      filters: [],
      data: [],
    };

    this.onSearchInput = this.onSearchInput.bind(this);
    this.onSearchFilter = this.onSearchInput.bind(this);
  }

  componentDidMount() {
    this.loadData(dataUrl, results => {
      console.log(results)
      const sortedData = results.data.sort((a, b) => a.Name.localeCompare(b.Name));
      this.setState({ data: sortedData })

      const filters = this.prepareFilters(results.meta.fields)
      this.setState({ filters })
    })
  }

  prepareFilters(fields) {
    return fields
      .filter(function identifySearchOption(field) {
        return field[0] === searchOptionPrefix
      }).map(function formatAsFilter(field) {
        const key = field.substr(1) // strip prefix
        return {
          key,
          label: key.replace("_", " ")
        }
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
  }

  onSearchInput(searched) {
    this.setState({ searched });
  }

  onSearchFilter(filters) {
    // TODO
    // this.setState({ filters });
  }

  render() {
    return (
      <div className="voice-app">
        <SearchBox value={this.state.searched} onChange={this.onSearchInput} />
        <SearchFilters filters={this.state.filters} onChange={this.onSearchFilter} />
        <SearchResults term={this.state.searched} filters={this.state.filters} data={this.state.data} />
      </div>
    );
  }
}

ReactDOM.render(<VoiceApp/>, document.getElementById('root'));
