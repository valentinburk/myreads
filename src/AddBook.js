import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Book from './Book';
import * as BooksAPI from './BooksAPI';

class AddBook extends Component {
  state = {
    booksFound: false,
    query: '',
    books: []
  }

  updateQuery = (query) => {
    this.setState({ query, booksFound: true });

    if (!query) {
      this.setState({ books: [], booksFound: false });
      return;
    }

    BooksAPI.search(query).then(result => {
      if (result && !result.error) {
        const books = result.map(b => {
          b.shelf = this.getShelf(b);
          return b;
        });
        this.setState({ books: books, booksFound: true });
      } else {
        this.setState({ books: [], booksFound: false });
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
    const { query, books, booksFound } = this.state;

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
          {((query && booksFound) || (!query && !booksFound)) ? (
            <ol className='books-grid'>
              {books.map(book => (
                <li key={book.id}>
                  <Book
                    book={book}
                    changeShelf={this.props.onAddingBook} />
                </li>
              ))}
            </ol>
          ) : (
            <div className='search-book-results-empty'>
              No books found
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default AddBook;