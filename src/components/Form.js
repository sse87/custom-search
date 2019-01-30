import React, { Component } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'

class Form extends Component {
  constructor (props) {
    super(props)

    this.state = {
      searchInput: ''
    }

    this.debounceSubmit = _.debounce(this.debounceSubmit, 700)

    this.searchQueryOnChange = this.searchQueryOnChange.bind(this)
    this.formOnSubmit = this.formOnSubmit.bind(this)
  }

  debounceSubmit () {
    // This is the function that will be executed after given delay
    this.submitSearchQuery()
  }

  searchQueryOnChange (e) {
    this.setState({ searchInput: e.target.value })
    this.debounceSubmit()
  }

  formOnSubmit (e) {
    e.preventDefault()

    // This will cancel the delayed function so we will not submit twice
    this.debounceSubmit.cancel()

    this.submitSearchQuery()
  }

  submitSearchQuery () {
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
          <div className='col-sm-9 col-md-8 col-lg-6 mb-3'>
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
