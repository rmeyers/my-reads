import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import {DebounceInput} from 'react-debounce-input';
import FadeIn from 'react-fade-in';
// import PropTypes from 'prop-types'
// import escapeRegExp from 'escape-string-regexp'
// import sortBy from 'sort-by'
import * as BooksAPI from './BooksAPI'
import Book from './Book'


class SearchBooks extends Component {

    state = {
        query: '',
        newBooks: []
    }

    findBooks = (event) => {

        const query = event.target.value

        this.setState({ query })

        if (query) {
          BooksAPI.search(query).then((result) => {
            if ('error' in result) {
              this.setState({newBooks: []})
            } else {
              this.setState({newBooks: result})
            }
          })
        } else {
            this.setState({newBooks: [], query: ''})
        }
    }

    render() {
      // These two variables below are used to just clean the code.
      // const { books } = this.props
      const { query, newBooks } = this.state
      const { books, changeBookShelf } = this.props

      Object.keys(newBooks).forEach(function(key) {
        var thisId = newBooks[key].id
        for (var existingBook in books) {
          if (books[existingBook].id === thisId) {
            newBooks[key] = books[existingBook]
          }
        }
      })

        return (
          <div className="search-books">
            <div className="search-books-bar">
              <Link to="/" className="close-search">Close</Link>
              <div className="search-books-input-wrapper">
                <DebounceInput
                  minLength={2}
                  debounceTimeout={200}
                  type='text'
                  placeholder='Search by title or author'
                  value={query}
                  onChange={ this.findBooks }
                />
              </div>
            </div>
            <div className="search-books-results">
              <FadeIn>
                <ol className="books-grid">
                  {newBooks.map((book) => (
                    <li key={ book.id }>
                      { Book ({
                          thisBook: book,
                          changeBookShelf: changeBookShelf
                      })}
                    </li>
                  ))}
                </ol>
              </FadeIn>
            </div>
          </div>
        )
    }
}

export default SearchBooks