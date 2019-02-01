import React from 'react'
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroller'

const Results = ({ searchResults, searchQuery, fetching, fetchMore, hasMore }) => {
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
    <InfiniteScroll
      className='row'
      pageStart={0}
      loadMore={() => {
        console.log('loadMore() => fetchMore()')
        fetchMore()
      }}
      hasMore={hasMore}
      loader={(
        <div className='col-12 text-center' key={0}>
          <div className='spinner-border'>
            <span className='sr-only'>Loading...</span>
          </div>
        </div>
      )}
    >
      {searchResults.map(item => (
        <div className='col-md-4' key={`${item.id}`}>
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
    </InfiniteScroll>
  )
}

Results.propTypes = {
  searchResults: PropTypes.array,
  searchQuery: PropTypes.string,
  fetching: PropTypes.bool,
  fetchMore: PropTypes.func.isRequired,
  hasMore: PropTypes.func.isRequired
}

Results.defaultProps = {
  searchResults: [],
  searchQuery: '',
  fetching: false
}

export default Results
