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
    return BooksAPI.update(book, shelf).then(() => {
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

      console.log('changeShelf', books);
      this.setState({ books });
    });
  }

  renderBooksList = () => {
    return (
        <div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>
          <BookShelf
            changeShelf={this.changeShelf}
            shelfName='Currently Reading'
            books={this.state.books.filter(b => b.shelf === 'currentlyReading')} />
          <BookShelf
            changeShelf={this.changeShelf}
            shelfName='Want To Read'
            books={this.state.books.filter(b => b.shelf === 'wantToRead')} />
          <BookShelf
            changeShelf={this.changeShelf}
            shelfName='Read'
            books={this.state.books.filter(b => b.shelf === 'read')} />
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
              this.changeShelf(book, shelf).then(() => history.push('/'));
            }}
          />
        )}/>
      </div>
    );
  }
}

export default App;
