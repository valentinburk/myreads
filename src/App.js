import React, { Component } from 'react';
import { Route } from 'react-router-dom';
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

  render() {
    return (
      <div>
        <Route exact path='/' render={() => (
            <div className="list-books">
              <div className="list-books-title">
                <h1>MyReads</h1>
              </div>
              <BookShelf
                shelfName='Currently Reading'
                books={this.state.books.filter(b => b.shelf === 'currentlyReading')} />
              <BookShelf
                shelfName='Want To Read'
                books={this.state.books.filter(b => b.shelf === 'wantToRead')} />
              <BookShelf
                shelfName='Read'
                books={this.state.books.filter(b => b.shelf === 'read')} />
            </div>
          )}/>
        <Route path='/search' render={({ history }) => (
          <AddBook
            onAddingBook={(book) => {
              history.push('/')
            }}
          />
        )}/>
      </div>
    );
  }
}

export default App;
