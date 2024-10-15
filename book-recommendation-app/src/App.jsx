import { useState, useEffect } from 'react';
import axios from 'axios';
import BookCard from './components/BookCard';
import './index.css';

function App() {
  const [query, setQuery] = useState('');
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [page, setPage] = useState(0);
  const [darkMode, setDarkMode] = useState(false);
  const [favorites, setFavorites] = useState(() => JSON.parse(localStorage.getItem('favorites')) || []);
  const [viewFavorites, setViewFavorites] = useState(false);

  const fetchBooks = async () => {
    setLoading(true);
    setError('');
    try {
      const startIndex = page * 10;
      const response = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=${query}&startIndex=${startIndex}&key=${import.meta.env.VITE_GOOGLE_API_KEY}`
      );
      setBooks(response.data.items || []);
    } catch (err) {
      setError('Could not fetch books. Try again.');
    } finally {
      setLoading(false);
    }
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const toggleFavorite = (book) => {
    const updatedFavorites = favorites.find((fav) => fav.id === book.id)
      ? favorites.filter((fav) => fav.id !== book.id)
      : [...favorites, book];
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  useEffect(() => {
    if (query) fetchBooks();
  }, [page]);

  return (
    <div className={`app ${darkMode ? 'dark' : ''}`}>
      <header className="header">
        <h1>📚 Book Explorer</h1>
        <p>Discover books by title, author, or genre!</p>
        <button onClick={toggleDarkMode}>
          {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
        </button>
        <br />
        <button onClick={() => setViewFavorites(!viewFavorites)}>
          {viewFavorites ? 'Back to Search' : 'View Favorites'}
        </button>
      </header>

      {!viewFavorites && (
        <div className="search-container">
          <input
            type="text"
            placeholder="Search books..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button onClick={fetchBooks}>Search</button>
        </div>
      )}

      {loading && <div className="loader">Loading...</div>}
      {error && <p className="error">{error}</p>}

      <div className="book-grid">
        {(viewFavorites ? favorites : books).map((book) => (
          <BookCard
            key={book.id}
            book={book}
            toggleFavorite={toggleFavorite}
            isFavorite={favorites.some((fav) => fav.id === book.id)}
          />
        ))}
      </div>

      {!viewFavorites && (
        <div className="pagination">
          <button onClick={() => setPage((p) => Math.max(p - 1, 0))} disabled={page === 0}>
            Previous
          </button>
          <button onClick={() => setPage((p) => p + 1)}>Next</button>
        </div>
      )}
    </div>
  );
}

export default App;
