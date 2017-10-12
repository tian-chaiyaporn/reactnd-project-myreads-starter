import React from 'react'
import * as BooksAPI from './BooksAPI'
import { Route, Link } from 'react-router-dom'
import './App.css'
import BookShelf from './BookShelf'
import SearchResults from './SearchResults'

class BooksApp extends React.Component {
  state = {
    bookList: [
      {
        title: 'To Kill a Mockingbird',
        coverUrl: 'http://books.google.com/books/content?id=PGR2AwAAQBAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE73-GnPVEyb7MOCxDzOYF1PTQRuf6nCss9LMNOSWBpxBrz8Pm2_mFtWMMg_Y1dx92HT7cUoQBeSWjs3oEztBVhUeDFQX6-tWlWz1-feexS0mlJPjotcwFqAg6hBYDXuK_bkyHD-y&source=gbs_api',
        author: 'Harper Lee',
        shelf: 'Currently Reading'
      },
      {
        title: '1776',
        coverUrl: 'http://books.google.com/books/content?id=uu1mC6zWNTwC&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE73pGHfBNSsJG9Y8kRBpmLUft9O4BfItHioHolWNKOdLavw-SLcXADy3CPAfJ0_qMb18RmCa7Ds1cTdpM3dxAGJs8zfCfm8c6ggBIjzKT7XR5FIB53HHOhnsT7a0Cc-PpneWq9zX&source=gbs_api',
        author: 'David McCullough',
        shelf: 'Want to Read'
      },
      {
        title: "Ender's Game",
        coverUrl: 'http://books.google.com/books/content?id=yDtCuFHXbAYC&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE72RRiTR6U5OUg3IY_LpHTL2NztVWAuZYNFE8dUuC0VlYabeyegLzpAnDPeWxE6RHi0C2ehrR9Gv20LH2dtjpbcUcs8YnH5VCCAH0Y2ICaKOTvrZTCObQbsfp4UbDqQyGISCZfGN&source=gbs_api',
        author: 'Orson Scott Card',
        shelf: 'Currently Reading'
      },
      {
        title: "Harry Potter and the Sorcerer's Stone",
        coverUrl: 'http://books.google.com/books/content?id=wrOQLV6xB-wC&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE72G3gA5A-Ka8XjOZGDFLAoUeMQBqZ9y-LCspZ2dzJTugcOcJ4C7FP0tDA8s1h9f480ISXuvYhA_ZpdvRArUL-mZyD4WW7CHyEqHYq9D3kGnrZCNiqxSRhry8TiFDCMWP61ujflB&source=gbs_api',
        author: 'J.K. Rowling',
        shelf: 'Want to Read'
      },
      {
        title: 'The Hobbit',
        coverUrl: 'http://books.google.com/books/content?id=pD6arNyKyi8C&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE70Rw0CCwNZh0SsYpQTkMbvz23npqWeUoJvVbi_gXla2m2ie_ReMWPl0xoU8Quy9fk0Zhb3szmwe8cTe4k7DAbfQ45FEzr9T7Lk0XhVpEPBvwUAztOBJ6Y0QPZylo4VbB7K5iRSk&source=gbs_api',
        author: 'J.R.R. Tolkien',
        shelf: 'Read'
      },
      {
        title: "Oh, the Places You'll Go!",
        coverUrl: 'http://books.google.com/books/content?id=1q_xAwAAQBAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE712CA0cBYP8VKbEcIVEuFJRdX1k30rjLM29Y-dw_qU1urEZ2cQ42La3Jkw6KmzMmXIoLTr50SWTpw6VOGq1leINsnTdLc_S5a5sn9Hao2t5YT7Ax1RqtQDiPNHIyXP46Rrw3aL8&source=gbs_api',
        author: 'Seuss',
        shelf: 'Read'
      },
      {
        title: 'The Adventures of Tom Sawyer',
        coverUrl: 'http://books.google.com/books/content?id=32haAAAAMAAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE72yckZ5f5bDFVIf7BGPbjA0KYYtlQ__nWB-hI_YZmZ-fScYwFy4O_fWOcPwf-pgv3pPQNJP_sT5J_xOUciD8WaKmevh1rUR-1jk7g1aCD_KeJaOpjVu0cm_11BBIUXdxbFkVMdi&source=gbs_api',
        author: 'Mark Twain',
        shelf: 'Read'
      }
    ],
    query: '',
    searchBooks: []
  }

  updateQuery = (query) => {
    this.setState({ query: query.trim() })
    BooksAPI.search(query)
      .then(res => {
        if (!res) {
          return;
        } else {
          return res.map(bookResult => {
            return {
              title: bookResult.title,
              coverUrl: bookResult.imageLinks.thumbnail,
              author: bookResult.authors ? bookResult.authors.reduce((a, b) => a + ', ' + b) : 'unknown'
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
  }

  render() {
    return (
      <div className="app">

        <Route exact path="/" render={() => (
            <div className="list-books">
              <div className="list-books-title">
                <h1>MyReads</h1>
              </div>
              <div className="list-books-content">
                <div>
                  <BookShelf
                    bookShelfTitle='Currently Reading'
                    bookList={this.state.bookList.filter(book => book.shelf === 'Currently Reading')}
                  />
                  <BookShelf
                    bookShelfTitle='Want to Read'
                    bookList={this.state.bookList.filter(book => book.shelf === 'Want to Read')}
                  />
                  <BookShelf
                    bookShelfTitle='Read'
                    bookList={this.state.bookList.filter(book => book.shelf === 'Read')}
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
            <SearchResults
              searchBooks={this.state.searchBooks}
              query={this.state.query}
              onUpdateQuery={this.updateQuery}
            />
          )}
        />

      </div>
    );
  }
}

export default BooksApp
