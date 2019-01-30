import React from 'react'
import PropTypes from 'prop-types'
import { makeId } from '../utilityFunctions'

const Results = ({ searchResults, searchQuery, fetching }) => {
  // Spinner
  if (fetching) {
    return (
      <div className='text-center'>
        <div className='spinner-border'>
          <span className='sr-only'>Loading...</span>
        </div>
      </div>
    )
  }

  // No results messages
  if (searchResults.length === 0) {
    // No results before searching
    if (searchQuery === '') {
      return <div><span>Byrjaðu að slá inn í leitargluggann til að fá myndir</span></div>
    }
    // No results after searching:
    return <div><span>Engar myndir fundust við leitina að: <strong>"{searchQuery}"</strong></span></div>
  }

  // Results
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
  fetching: PropTypes.bool
}

Results.defaultProps = {
  searchResults: [],
  searchQuery: '',
  fetching: false
}

export default Results
