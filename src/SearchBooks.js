import React, { Component } from 'react'
import { Link } from 'react-router-dom'
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
                this.setState({newBooks: result})
            })

        } else {
            this.setState({newBooks: []})
        }
    }

    render() {
        // These two variables below are used to just clean the code.
        // const { books } = this.props
        const { query, newBooks } = this.state
        const { changeBookShelf } = this.props

        return (
          <div className="search-books">
            <div className="search-books-bar">
              <Link to="/" className="close-search">Close</Link>
              <div className="search-books-input-wrapper">
                <input
                  type='text'
                  placeholder='Search by title or author'
                  value={query}
                  onChange={ this.findBooks }
                />
              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid">
                {newBooks.map((book) => (
                  <li key={ book.id }>
                    <Book
                        thisBook={ book }
                        changeBookShelf={ changeBookShelf }>
                    </Book>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        )
    }
}

export default SearchBooks