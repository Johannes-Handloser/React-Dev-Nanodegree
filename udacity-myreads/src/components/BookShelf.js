import React from 'react';
import PropTypes from 'prop-types';
import Book from './Book';


const BookShelf = props => {

    const {books, onUpdateShelf} = props;

    return (
        <ol className="books-grid">
            {books.map((book) => (
                <Book
                    key={book.id}
                    book={book}
                    books={books}
                    onUpdateShelf={onUpdateShelf}
                />
            ))}
        </ol>
    )

};

BookShelf.propTypes = {
    books: PropTypes.array.isRequired,
    onUpdateShelf: PropTypes.func.isRequired
};


export default BookShelf
