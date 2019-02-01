import React, { Component, Fragment } from 'react'
import axios from 'axios'

import Header from './components/Header'
import Form from './components/Form'
import Results from './components/Results'

import { makeId } from './utilityFunctions'
import { googleapisConfig } from './config'

class App extends Component {
  constructor (props) {
    super(props)

    this.state = {
      searchQuery: '',
      searchResults: [],
      fetching: false,
      nextIndex: 1
    }

    this.submitSearchQuery = this.submitSearchQuery.bind(this)
    this.fetchMore = this.fetchMore.bind(this)
  }

  fetchData (searchQuery) {
    const { nextIndex } = this.state

    this.setState({
      fetching: true,
      searchQuery
    })

    axios.get(googleapisConfig.url, {
      params: { ...googleapisConfig.params, q: searchQuery, start: nextIndex }
    }).then((res) => {
      const items = res.data.items.map(item => {
        item.id = makeId()
        return item
      })
      this.setState({
        searchResults: items,
        fetching: false,
        nextIndex: res.data.queries.nextPage[0].startIndex
      })
      console.log('fetchData() - res.data:', res.data)
    }).catch((error) => {
      this.setState({ fetching: false })
      // TODO: handle error alert for user
      console.log(error)
    })
  }

  fetchMore () {
    const { nextIndex } = this.state

    axios.get(googleapisConfig.url, {
      params: { ...googleapisConfig.params, q: this.state.searchQuery, start: nextIndex }
    }).then((res) => {
      const items = res.data.items.map(item => {
        item.id = makeId()
        return item
      })
      this.setState({
        searchResults: [...this.state.searchResults, ...items],
        nextIndex: res.data.queries.nextPage[0].startIndex
      })
      console.log('fetchMore() - res.data:', res.data)
    }).catch((error) => {
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
    const { searchQuery, searchResults, fetching, nextIndex } = this.state
    return (
      <Fragment>
        <Header />
        <main>
          <div className='container'>
            <Form submitSearchQuery={this.submitSearchQuery} />
          </div>
          <div className='bg-light py-3'>
            <div className='container'>
              <Results
                searchQuery={searchQuery}
                searchResults={searchResults}
                fetching={fetching}
                fetchMore={this.fetchMore}
                hasMore={nextIndex < 100}
              />
            </div>
          </div>
        </main>
      </Fragment>
    )
  }
}

export default App
