import React from 'react';
import * as BooksAPI from '../BooksAPI';
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import Book from "./Book";


class SearchBook extends React.Component {

    state = {
        query: '',
        searchResultBooks: []
    };


    updateQuery = query => {
        const SEARCH_LENGTH = 30;
        this.setState(() => ({
            query: query
        }));

        if (query) {
            BooksAPI.search(query.trim(), SEARCH_LENGTH).then((books) => {
                if (books.length < 1 || books === undefined) {
                    console.log("no books found");
                    this.setState({searchResultBooks: []})
                } else {
                    this.setState({searchResultBooks: books})
                }
            })
        } else {
            console.log("list of books empty");
            this.setState({searchResultBooks: []});
        }
    };


    render() {

        const {query, searchResultBooks} = this.state;
        const {books, onUpdateShelf} = this.props;

        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link className="close-search" to="/">
                        Close
                    </Link>
                    <div className="search-books-input-wrapper">
                        <input
                            type="text"
                            placeholder="Search by title or author"
                            value={query}
                            onChange={(event) => this.updateQuery(event.target.value)}
                        />
                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        {searchResultBooks.length > 0 &&
                        searchResultBooks.map(book => (
                            <Book
                                key={book.id}
                                book={book}
                                books={books}
                                onUpdateShelf={onUpdateShelf}
                            />
                        ))}
                    </ol>
                </div>
            </div>
        )
    }


    static propTypes = {
        books: PropTypes.array.isRequired,
        onUpdateShelf: PropTypes.func.isRequired
    };
}


export default SearchBook