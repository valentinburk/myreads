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
      console.log(books);
    })
  }

  changeShelf = (book, shelf) => {
    console.log(book, shelf);
    BooksAPI.update(book, shelf).then(
      this.setState(state => ({
        books: state.books.map(b => {
          if (b.id === book.id) b.shelf = shelf;
          return b;
        })
      }))
    );
  }

  render() {
    return (
      <div>
        <Route exact path='/' render={() => (
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
          )}/>
        <Route path='/search' render={({ history }) => (
          <AddBook
            onAddingBook={(book) => {
              history.push('/');
            }}
          />
        )}/>
      </div>
    );
  }
}

export default App;
