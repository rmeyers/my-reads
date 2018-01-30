import React from 'react'
// import * as BooksAPI from './BooksAPI'


const Book = (props) => {
  // These two variables below are used to just clean the code.
  const { thisBook, changeBookShelf } = props
  if ('imageLinks' in thisBook) {
    if ('thumbnail' in thisBook.imageLinks) {
      var image = thisBook.imageLinks.thumbnail
    }
  } else {
    image = "http://via.placeholder.com/128x193?text=No%20Cover"
  }
  const title = thisBook.title ? thisBook.title : "No title available"
  const shelf = thisBook.shelf ? thisBook.shelf : "none"

  return (
    <div className="book">
      <div className="book-top">
        <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${image})` }}></div>
        <div className="book-shelf-changer">
          <select
            value={ shelf }
            onChange={event => changeBookShelf(thisBook, event.target.value)}
          >
            <option value="noValue" disabled>Move to...</option>
            <option value="currentlyReading">Currently Reading</option>
            <option value="wantToRead">Want to Read</option>
            <option value="read">Read</option>
            <option value="none">None</option>
          </select>
        </div>
      </div>
      <div className="book-title">{ title }</div>
      <div className="book-authors">{ thisBook.authors }</div>
    </div>
  )
}

export default Book