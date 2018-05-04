import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import BookShelf from './BookShelf';
import AddBook from './AddBook';
import * as BooksAPI from './BooksAPI';
import './App.css';

class App extends Component {
  state = {
    books: []
  }

  componentDidMount() {
    BooksAPI.getAll().then(books => {
      this.setState({ books });
    })
  }

  changeShelf = (book, shelf) => {
    BooksAPI.update(book, shelf).then(() => {
      const books = this.state.books.map(b => {
        if (b.id === book.id) {
          b.shelf = shelf;
        };

        return b;
      });

      if (books.filter(b => b.id === book.id).length === 0) {
        book.shelf = shelf;
        books.push(book);
      }

      this.setState({ books });
    });
  }

  renderBooksList = () => {
    const SHELVES = [
      ['Currently Reading', 'currentlyReading'],
      ['Want to Read', 'wantToRead'],
      ['Read', 'read']
    ]

    return (
        <div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>
          {SHELVES.map((shelf, index) => (
            <BookShelf
              key={index}
              changeShelf={this.changeShelf}
              shelfName={shelf[0]}
              books={this.state.books.filter(b => b.shelf === shelf[1])} />
          ))}
          <div className="open-search">
            <Link to='/search'>Add a book</Link>
          </div>
        </div>
      );
  }

  render() {
    return (
      <div>
        <Route exact path='/' render={this.renderBooksList}/>
        <Route path='/search' render={({ history }) => (
          <AddBook
            addedBooks={this.state.books}
            onAddingBook={(book, shelf) => {
              this.changeShelf(book, shelf);
              history.push('/');
            }}
          />
        )}/>
      </div>
    );
  }
}

export default App;
