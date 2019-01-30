import React from 'react'
import PropTypes from 'prop-types'
import { makeId } from '../utilityFunctions'

const Results = ({ searchResults, searchQuery, fetching }) => {
  if (fetching) {
    return (
      <div className='text-center'>
        <div className='spinner-border'>
          <span className='sr-only'>Loading...</span>
        </div>
      </div>
    )
  }

  if (searchResults.length === 0) {
    if (searchQuery === '') {
      return (
        <div className='text-center'>
          <span>Þú átt eftir að nota leitina...</span>
        </div>
      )
    }

    return (
      <div className='text-center'>
        <span>Engar niðurstöður fundust við leitina að: "{searchQuery}"</span>
      </div>
    )
  }

  return (
    <div className='row'>
      {searchResults.map(item => (
        <div className='col-md-4' key={`${item.htmlTitle}${makeId()}`}>
          <div className='card mb-4 shadow-lg'>
            <a
              href={item.image.contextLink}
              target='_blank'
              rel='noopener noreferrer'
              className='bd-placeholder-img card-img'
              style={{ backgroundImage: `url('${item.link}')` }}
              title={item.title}
            ><span className='sr-only'>{item.title}</span></a>
          </div>
        </div>
      ))}
    </div>
  )
}

Results.propTypes = {
  searchResults: PropTypes.array,
  searchQuery: PropTypes.string,
  fetching: PropTypes.bool,
  neverSearched: PropTypes.bool
}

Results.defaultProps = {
  searchResults: [],
  searchQuery: '',
  fetching: false,
  neverSearched: true
}

export default Results
