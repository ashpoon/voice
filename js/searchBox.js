import React from 'react'

class SearchBox extends React.Component {
  constructor (props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange (event) {
    this.props.onChange(event.target.value)
  }

  render () {
    return <input type='text' className='voice-search-input form-control' value={this.props.value} onChange={this.handleChange} placeholder='Search...' autoComplete='off' />
  }
}

export default SearchBox
