import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import Book from './Book'

class SearchResults extends Component {
  static propTypes = {
    searchBooks: PropTypes.array.isRequired,
    query: PropTypes.string.isRequired,
    onUpdateQuery: PropTypes.func.isRequired
  }

  render() {
    const returnBooks = this.props.searchBooks.map(book => {
      return (
        <li key={book.title + Math.random()}>
          <Book
            bookTitle={book.title}
            bookAuthor={book.author}
            bookCoverUrl={book.coverUrl}
          />
        </li>
      )
    })

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to='/' className='close-search'/>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              value={this.props.query}
              onChange={(e) => this.props.onUpdateQuery(e.target.value)}
              placeholder="Search by title or author"
            />
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
}

export default SearchResults
