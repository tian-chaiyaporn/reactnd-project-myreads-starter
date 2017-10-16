import React from 'react';
import PropTypes from 'prop-types'

function Book({bookObj, changeShelf}) {
  return (
    <div className="book">
      <div className="book-top">
        <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${bookObj.coverUrl})` }}></div>
        <div className="book-shelf-changer">
          <select value={bookObj.shelf} onChange={e => changeShelf(bookObj, e.target.value)}>
            <option value="none" disabled>Move to...</option>
            <option value="currentlyReading">Currently Reading</option>
            <option value="wantToRead">Want to Read</option>
            <option value="read">Read</option>
            <option value="none">None</option>
          </select>
        </div>
      </div>
      <div className="book-title">{bookObj.title}</div>
      <div className="book-authors">{bookObj.author}</div>
    </div>
  )
}

Book.propTypes = {
  bookObj: PropTypes.object.isRequired,
  changeShelf: PropTypes.func.isRequired
}

export default Book
