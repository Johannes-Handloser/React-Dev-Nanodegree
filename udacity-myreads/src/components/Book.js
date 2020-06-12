import React from 'react'
import PropTypes from 'prop-types'
import UpdateShelf from "./UpdateShelf";
import noImg from "../icons/no-img.jpg";


const Book = props => {

    const {book, books, onUpdateShelf} = props;

    const title = book.title ? book.title : 'No title';
    const bookImg = book.imageLinks ? book.imageLinks.thumbnail : noImg;

    return (
        <li key={book.id}>
            <div className="book">
                <div className="book-top">
                    <div
                        className="book-cover"
                        style={{width: 128, height: 192, backgroundImage: `url(${bookImg})`}}
                    />
                    <UpdateShelf book={book} books={books} onUpdateShelf={onUpdateShelf}/>
                </div>
                <div className="book-title">{title}</div>
                {
                    book.authors &&
                    book.authors.map((author, index) => (
                        <div className="book-authors" key={index}>
                            {author}
                        </div>
                    ))
                }
            </div>
        </li>
    );
};

Book.propTypes = {
    book: PropTypes.object.isRequired,
    books: PropTypes.array.isRequired,
    onUpdateShelf: PropTypes.func.isRequired
};


export default Book;