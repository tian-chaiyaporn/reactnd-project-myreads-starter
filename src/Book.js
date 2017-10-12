import React, { Component } from 'react';
import PropTypes from 'prop-types'

class Book extends Component {
  static propTypes = {
    bookObj: PropTypes.object.isRequired,
    changeShelf: PropTypes.func.isRequired
  }

  render() {
    return (
      <div className="book">
        <div className="book-top">
          <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${this.props.bookObj.coverUrl})` }}></div>
          <div className="book-shelf-changer">
            <select value={this.props.bookObj.shelf} onChange={e => this.props.changeShelf(this.props.bookObj, e.target.value)}>
              <option value="none" disabled>Move to...</option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{this.props.bookObj.title}</div>
        <div className="book-authors">{this.props.bookObj.author}</div>
      </div>
    )
  }
}

export default Book
