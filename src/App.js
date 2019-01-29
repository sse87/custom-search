import React, { Component, Fragment } from 'react'
import Header from './components/Header'

class App extends Component {
  render () {
    return (
      <Fragment>
        <Header />
        <main>
          <div className='container'>
            <div>
              Hello World<br />
              <strong>Custom Search Demo</strong> here!
            </div>
          </div>
        </main>
      </Fragment>
    )
  }
}

export default App
