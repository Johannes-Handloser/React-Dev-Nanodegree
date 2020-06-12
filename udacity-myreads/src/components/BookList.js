import React  from 'react'
import PropTypes from 'prop-types'
import BookShelf from './BookShelf';

const BookList = props => {


    const { books, onUpdateShelf } = props;

    const shelfStates = [
        { type: 'currentlyReading', title: 'Currently Reading', id:0 },
        { type: 'wantToRead', title: 'Want to Read', id:1 },
        { type: 'read', title: 'Read', id:2 }
    ];



        return(
            <div className="list-books-content">
                {shelfStates.map((shelf) => {
                        console.log(shelf);
                        const booksInShelf = books.filter(book => book.shelf === shelf.type);
                        console.log(booksInShelf);
                        return (
                            <div className="bookshelf" key={shelf.id}>
                                <h2 className="bookshelf-title">{shelf.title}</h2>
                                <div className="bookshelf-books">
                                    <BookShelf books={booksInShelf} onUpdateShelf={onUpdateShelf} />
                                </div>
                            </div>
                        )
                    }
                    )}
            </div>
        )
    };


BookList.propTypes = {
    books: PropTypes.array.isRequired,
    onUpdateShelf: PropTypes.func.isRequired
};

export default BookList