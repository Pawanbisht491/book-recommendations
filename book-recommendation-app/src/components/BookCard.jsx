function BookCard({ book, toggleFavorite, isFavorite }) {
    const { title, authors, description, imageLinks, infoLink } = book.volumeInfo;
  
    return (
      <div className="book-card">
        <img
          src={imageLinks?.thumbnail || 'https://via.placeholder.com/150'}
          alt={title}
          className="book-image"
        />
        <div className="book-info">
          <h3 className="book-title">{title}</h3>
          <p className="book-author">by {authors?.join(', ')}</p>
          <p className="book-description">
            {description ? description.substring(0, 120) + '...' : 'No description available.'}
          </p>
          <div className="book-actions">
            <button onClick={() => window.open(infoLink, '_blank')}>
              📖 Read More
            </button>
            <button onClick={() => toggleFavorite(book)}>
              {isFavorite ? '💖 Remove Favorite' : '🤍 Add Favorite'}
            </button>
          </div>
        </div>
      </div>
    );
  }
  
  export default BookCard;
  