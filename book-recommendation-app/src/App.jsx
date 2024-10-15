import { useState } from 'react';
import axios from 'axios';
import BookCard from './components/BookCard';
import './index.css';

function App() {
  const [query, setQuery] = useState('');
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchBooks = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=${query}&key=${import.meta.env.VITE_GOOGLE_API_KEY}`
      );
      setBooks(response.data.items || []);
    } catch (err) {
      setError('Could not fetch books. Try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <header className="header">
        <h1>📚 Book Explorer</h1>
        <p>Discover books by title, author, or genre!</p>
      </header>

      <div className="search-container">
        <input
          type="text"
          placeholder="Search books..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button onClick={fetchBooks}>Search</button>
      </div>

      {loading && <div className="loader">Loading...</div>}
      {error && <p className="error">{error}</p>}

      <div className="book-grid">
        {books.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
    </div>
  );
}

export default App;
