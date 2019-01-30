import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Form extends Component {
  constructor (props) {
    super(props)

    this.state = {
      searchInput: ''
    }

    this.searchQueryOnChange = this.searchQueryOnChange.bind(this)
    this.formOnSubmit = this.formOnSubmit.bind(this)
  }

  searchQueryOnChange (e) {
    this.setState({ searchInput: e.target.value })
  }

  formOnSubmit (e) {
    e.preventDefault()
    if (this.state.searchInput !== '') {
      this.props.submitSearchQuery(this.state.searchInput)
    }
  }

  render () {
    return (
      <form className='mb-3' onSubmit={this.formOnSubmit}>
        <div className='row'>
          <div className='col-12 mb-3'>
            <h1>Myndaleit</h1>
          </div>
          <div className='col-sm-9 col-lg-10 mb-3'>
            <label htmlFor='searchQuery' className='sr-only'>Myndaleit</label>
            <input
              type='text'
              className='form-control'
              id='searchQuery'
              placeholder=''
              value={this.state.searchInput}
              onChange={this.searchQueryOnChange}
              autoFocus
            />
          </div>
          <div className='col-sm-3 col-lg-2 mb-3'>
            <button type='submit' className='btn btn-primary btn-block' disabled={this.state.searchInput === ''}>Leita</button>
          </div>
        </div>
      </form>
    )
  }
}

Form.propTypes = {
  submitSearchQuery: PropTypes.func.isRequired
}

Form.defaultProps = {}

export default Form
