import React, { Component } from 'react';
import PropTypes from 'prop-types'
import Book from './Book'

class BookShelf extends Component {
  static propTypes = {
    bookList: PropTypes.array.isRequired,
    bookShelfTitle: PropTypes.string.isRequired,
    changeShelf: PropTypes.func.isRequired
  }

  render() {
    const books = this.props.bookList.map(book => {
      return (
        <li key={book.id}>
          <Book
            bookObj={book}
            changeShelf={this.props.changeShelf}
          />
        </li>
      )
    })

    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{this.props.bookShelfTitle}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {books}
          </ol>
        </div>
      </div>
    )
  }
}

export default BookShelf
