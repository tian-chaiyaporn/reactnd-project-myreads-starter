import React from 'react';
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import Book from './Book'
import { Debounce } from 'react-throttle'

function Search({searchBooks, query, clearQuery, onUpdateQuery, addToShelf}) {
  const returnBooks = searchBooks.map(book => {
    return (
      <li key={book.id}>
        <Book
          bookObj={book}
          changeShelf={addToShelf}
        />
      </li>
    )
  })

  return (
    <div className="search-books">
      <div className="search-books-bar">
        <Link to='/' className='close-search' onClick={e => clearQuery()}/>
        <div className="search-books-input-wrapper">
          <Debounce time="400" handler="onChange">
            <input
              type="text"
              // value={query} -- seems to be a bug with react-throttle library: issue#7
              onChange={(e) => onUpdateQuery(e.target.value)}
              placeholder="Search by title or author"
            />
          </Debounce>
        </div>
      </div>
      <div className="search-books-results">
        <ol className="books-grid">
          {returnBooks}
        </ol>
      </div>
    </div>
  )
}

Search.propTypes = {
  searchBooks: PropTypes.array.isRequired,
  query: PropTypes.string.isRequired,
  clearQuery: PropTypes.func.isRequired,
  onUpdateQuery: PropTypes.func.isRequired,
  addToShelf: PropTypes.func.isRequired
}

export default Search
