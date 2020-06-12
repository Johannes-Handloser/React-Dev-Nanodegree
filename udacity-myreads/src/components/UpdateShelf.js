import React from 'react'
import PropTypes from 'prop-types'

class UpdateShelf extends React.Component {


    updateShelf = event =>
        this.props.onUpdateShelf(this.props.book, event.target.value);


    render() {
        let shelf = 'none';

        this.props.books.map(b => {
            if (b.id === this.props.book.id) {
                shelf = b.shelf
            }
        });


        return (
            <div className="book-shelf-changer">
                <select onChange={this.updateShelf} defaultValue={shelf}>
                    <option value="move" disabled>Move to...</option>
                    <option value="currentlyReading">Currently Reading</option>
                    <option value="wantToRead">Want to Read</option>
                    <option value="read">Read</option>
                    <option value="none">None</option>
                </select>
            </div>
        )
    }


    static propTypes = {
        book: PropTypes.object.isRequired,
        books: PropTypes.array.isRequired,
        onUpdateShelf: PropTypes.func.isRequired
    };


}

export default UpdateShelf
