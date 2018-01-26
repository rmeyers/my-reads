import React, { Component } from 'react'
import { Link } from 'react-router-dom'
// import * as BooksAPI from './BooksAPI'
import Book from './Book'


class LandingPage extends Component {

    render() {

        const { books, changeBookShelf } = this.props

        const shelfTypes = [['currentlyReading', 'Currently Reading'],
          ['wantToRead', 'Want To Read'],
          ['read', 'Read']]

        return (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                { shelfTypes.map((shelf) => {
                  const theseBooks = books.filter( book => book.shelf === shelf[0] )
                  return (
                    <div className="bookshelf" key={ shelf[0] }>
                      <h2 className="bookshelf-title">{ shelf[1] }</h2>
                      <div className="bookshelf-books">
                        <ol className="books-grid">
                          { theseBooks.map((book) => {
                            return (
                              <li key={ book.id }>
                                <Book
                                  thisBook={ book }
                                  changeBookShelf={ changeBookShelf }>
                                >
                                </Book>
                              </li>
                            )
                          })}
                        </ol>
                      </div>
                    </div>
                    )
                })}
              </div>
            </div>
            <div className="open-search">
              <Link to="/search">Add a book</Link>
            </div>
          </div>
        )
    }
}

export default LandingPage