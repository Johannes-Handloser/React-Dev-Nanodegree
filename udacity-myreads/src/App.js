import React from 'react'
import * as BooksAPI from './BooksAPI'
import BookList from './components/BookList';
import SearchBook from './components/SearchBook';
import './App.css'
import { Route } from 'react-router-dom';
import { Link } from 'react-router-dom'

class BooksApp extends React.Component {
  state = {
    books: []
  };

  componentDidMount() {
    BooksAPI.getAll()
        .then((books) => {
          this.setState(() => ({
            books
          }))
        })
  };


  updateShelf = (changedBook, newShelf) => {
    BooksAPI.update(changedBook, newShelf).then(() => {
      changedBook.shelf = newShelf;
      this.setState(currentState => ({
        books: currentState.books
            .filter(book => book.id !== changedBook.id)
            .concat(changedBook)
    }))
  })
  };


  render() {
    return (
            <div className="app">
                <Route
                    exact
                    path="/"
                    render={() => (
                        <div className="list-books">
                            <div className="list-books-title">
                                <h1>MyReads</h1>
                            </div>
                            <BookList
                                books={this.state.books}
                                onUpdateShelf={this.updateShelf}
                            />
                            <div className="open-search">
                                <Link to="/search">
                                    <button>Add a book</button>
                                </Link>
                            </div>
                        </div>
                    )}
                />
                <Route
                    path="/search"
                    render={() => (
                        <SearchBook books={this.state.books} onUpdateShelf={this.updateShelf}/>
                    )}
                />

              </div>
    )
  }
}

export default BooksApp
