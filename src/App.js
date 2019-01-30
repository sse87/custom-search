import React, { Component, Fragment } from 'react'
import axios from 'axios'

import Header from './components/Header'
import Form from './components/Form'
import Results from './components/Results'

import { googleapisConfig } from './config'

class App extends Component {
  constructor (props) {
    super(props)

    this.state = {
      searchQuery: '',
      searchResults: [],
      fetching: false
    }

    this.submitSearchQuery = this.submitSearchQuery.bind(this)
  }

  fetchData (searchQuery) {
    this.setState({
      fetching: true,
      searchQuery
    })

    axios.get(googleapisConfig.url, {
      params: { ...googleapisConfig.params, q: searchQuery }
    }).then((res) => {
      this.setState({ searchResults: res.data.items, fetching: false })
      console.log(res.data)
    }).catch((error) => {
      this.setState({ fetching: false })
      // TODO: handle error alert for user
      console.log(error)
    })
  }

  submitSearchQuery (searchQuery) {
    if (searchQuery !== '') {
      this.fetchData(searchQuery)
    }
  }

  render () {
    const { searchQuery, searchResults, fetching } = this.state
    return (
      <Fragment>
        <Header />
        <main>
          <div className='container'>
            <Form submitSearchQuery={this.submitSearchQuery} />
          </div>
          <div className='bg-light py-3'>
            <div className='container'>
              <Results searchQuery={searchQuery} searchResults={searchResults} fetching={fetching} />
            </div>
          </div>
        </main>
      </Fragment>
    )
  }
}

export default App
