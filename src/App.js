import React from 'react'
import { Route } from 'react-router-dom'
// import * as BooksAPI from './BooksAPI'
import './App.css'
import * as BooksAPI from './BooksAPI'
import SearchBooks from './SearchBooks'
import LandingPage from './LandingPage'

class BooksApp extends React.Component {
  constructor() {
    super();

    this.state = {
      books: [],
    }
    this.changeBookShelf = this.changeBookShelf.bind(this);
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      // The below is the same as this.setState({ contacts: contacts })
      // This can be done with the key is the same as the value name.
      this.setState({ books })
    })
  }

  changeBookShelf(book, shelf) {
    BooksAPI.update(book, shelf).then(() => {
      book.shelf = shelf;
      this.setState(state => ({
        books: state.books.filter(b => b.id !== book.id).concat([book]),
      }))
    })
  }

  render() {
    return (
      <div className="app">
        <Route path="/" exact render={() => (
          <LandingPage
            books={this.state.books}
            changeBookShelf={this.changeBookShelf}
          />
        )} />
        <Route path="/search" render={() => (
          <SearchBooks
            changeBookShelf={this.changeBookShelf}
          />
        )} />
      </div>
    )
  }
}

export default BooksApp
