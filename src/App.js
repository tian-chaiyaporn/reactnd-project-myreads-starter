import React from 'react'
import * as BooksAPI from './BooksAPI'
import { Route, Link, Switch } from 'react-router-dom'
import './App.css'
import BookShelf from './BookShelf'
import Search from './Search'

class BooksApp extends React.Component {
  state = {
    bookList: [],
    query: '',
    searchBooks: []
  }

  componentDidMount() {
    BooksAPI.getAll()
      .then(payload => {
        return payload.map(book => {
          return {
            id: book.id,
            title: book.title,
            coverUrl: book.imageLinks ? book.imageLinks.thumbnail : 'http://via.placeholder.com/128x193?text=No%20Cover',
            author: book.authors ? book.authors.reduce((a, b) => a + ', ' + b) : 'unknown',
            shelf: book.shelf
          }
        })
      })
      .then(payload => {
        this.setState({
          bookList: payload
        })
      })
  }

  updateQuery = (query) => {
    if (query === '') {
      this.clearQuery();
      return;
    }
    this.setState({ query: query })
    BooksAPI.search(query)
      .then(res => {
        if (res.error) {
          return [];
        } else {
          return res.map(bookResult => {
            return {
              id: bookResult.id,
              title: bookResult.title,
              coverUrl: bookResult.imageLinks ? bookResult.imageLinks.thumbnail : 'http://via.placeholder.com/128x193?text=No%20Cover',
              author: bookResult.authors ? bookResult.authors.reduce((a, b) => a + ', ' + b) : 'unknown',
              shelf: 'none'
            }
          })
        }
      })
      .then((bookArray) => {
        this.setState({searchBooks: bookArray})
      })
  }

  clearQuery = () => {
    this.setState({ query: '' })
    this.setState({ searchBooks: [] })
  }

  changeShelf = (book, shelfName) => {
    BooksAPI
      .update(book, shelfName)
      .then(() => {
        this.setState((state) => ({
          bookList: state.bookList.map(b => {
            if (b.id === book.id) {
              b.shelf = shelfName
            }
            return b;
          })
        }))
      })
  }

  addToShelf = (searchBook, shelfName) => {
    const currentBookList = this.state.bookList;
    if (currentBookList.filter(b => b.id === searchBook.id).length === 0) {
      BooksAPI
        .get(searchBook.id)
        .then((receivedBook) => {
          this.changeShelf(receivedBook, shelfName);
          searchBook.shelf = shelfName;
          this.setState((state) => ({
            bookList: state.bookList.concat(searchBook)
          }))
        })
    } else {
      this.changeShelf(searchBook, shelfName)
    }
  }

  render() {
    return (
      <div className="app">
        <Switch>
          <Route exact path="/" render={() => (
              <div className="list-books">
                <div className="list-books-title">
                  <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                  <div>
                    <BookShelf
                      bookShelfTitle='Currently Reading'
                      bookList={this.state.bookList.filter(book => book.shelf === 'currentlyReading')}
                      changeShelf={this.changeShelf}
                    />
                    <BookShelf
                      bookShelfTitle='Want to Read'
                      bookList={this.state.bookList.filter(book => book.shelf === 'wantToRead')}
                      changeShelf={this.changeShelf}
                    />
                    <BookShelf
                      bookShelfTitle='Read'
                      bookList={this.state.bookList.filter(book => book.shelf === 'read')}
                      changeShelf={this.changeShelf}
                    />
                  </div>
                </div>
                <div className="open-search">
                  <Link to='/search' />
                </div>
              </div>
            )}
          />

          <Route exact path='/search' render={() => (
              <Search
                searchBooks={this.state.searchBooks}
                query={this.state.query}
                clearQuery={this.clearQuery}
                onUpdateQuery={this.updateQuery}
                addToShelf={this.addToShelf}
              />
            )}
          />

          <Route render={() => (
              <div>
                <h1>Sorry, This Page Cannot Be Found</h1>
                <Link to='/'>Back To Home</Link>
              </div>
            )}
          />
        </Switch>
      </div>
    );
  }
}

export default BooksApp
