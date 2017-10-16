import React from 'react';
import PropTypes from 'prop-types'
import Book from './Book'

function BookShelf({bookList, bookShelfTitle, changeShelf}) {
  const books = bookList.map(book => {
    return (
      <li key={book.id}>
        <Book
          bookObj={book}
          changeShelf={changeShelf}
        />
      </li>
    )
  })

  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{bookShelfTitle}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {books}
        </ol>
      </div>
    </div>
  )
}

BookShelf.propTypes = {
  bookList: PropTypes.array.isRequired,
  bookShelfTitle: PropTypes.string.isRequired,
  changeShelf: PropTypes.func.isRequired
}

export default BookShelf
