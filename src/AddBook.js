import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Book from './Book';
import * as BooksAPI from './BooksAPI';

class AddBook extends Component {
  state = {
    query: '',
    books: []
  }

  updateQuery = (query) => {
    this.setState({ query, books: [] });

    if (!query) {
      return;
    }

    const q = query;
    BooksAPI.search(q).then(result => {
      if (result && !result.error) {
        const books = result.map(b => {
          b.shelf = this.getShelf(b);
          return b;
        });
        this.setState({ books });
      }
    });
  }

  getShelf = (book) => {
    for (const b of this.props.addedBooks) {
      if (b.id === book.id) return b.shelf;
    }

    return 'none';
  }

  render() {
    const { query, books } = this.state;

    return (
      <div className='search-books'>
        <div className='search-books-bar'>
          <Link className='close-search' to='/'>Close</Link>
          <div className='search-books-input-wrapper'>
            <input
              value={query}
              type='text'
              placeholder='Search by title or author'
              onChange={event => this.updateQuery(event.target.value)} />
          </div>
        </div>
        <div className='search-books-results'>
          <ol className='books-grid'>
            {books.map(book => (
              <li key={book.id}>
                <Book
                  book={book}
                  changeShelf={this.props.onAddingBook} />
              </li>
            ))}
          </ol>
        </div>
      </div>
    );
  }
}

export default AddBook;