import React from 'react'
import { Switch, Route } from 'react-router-dom'
import FadeIn from 'react-fade-in';
import './App.css'
import * as BooksAPI from './BooksAPI'
import SearchBooks from './SearchBooks'
import LandingPage from './LandingPage'
import NoMatch from './NoMatch'

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
    if (book.shelf !== shelf) {
      BooksAPI.update(book, shelf).then(() => {
        book.shelf = shelf;
        this.setState(state => ({
          books: state.books.filter(b => b.id !== book.id).concat([book]),
        }))
      })
    }
  }

  render() {
    return (
      <div className="app">
        <FadeIn>
          <Switch>
            <Route path="/" exact render={() => (
              <LandingPage
                books={this.state.books}
                changeBookShelf={this.changeBookShelf}
              />
            )} />
            <Route path="/search" render={() => (
              <SearchBooks
                books={this.state.books}
                changeBookShelf={this.changeBookShelf}
              />
            )} />
            <Route component={NoMatch} />
          </Switch>
        </FadeIn>
      </div>
    )
  }
}

export default BooksApp
