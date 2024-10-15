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
      setError('Failed to fetch books.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <h1>Book Recommendation App</h1>
      <input
        type="text"
        placeholder="Enter a book title or author..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={fetchBooks}>Search</button>
      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}
      <div className="book-list">
        {books.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
    </div>
  );
}

export default App;
