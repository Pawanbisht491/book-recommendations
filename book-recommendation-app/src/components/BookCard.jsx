function BookCard({ book }) {
    const { title, authors, description, imageLinks } = book.volumeInfo;
    return (
      <div className="book-card">
        <img src={imageLinks?.thumbnail} alt={title} />
        <h3>{title}</h3>
        <p>by {authors?.join(', ')}</p>
        <p>{description?.substring(0, 100)}...</p>
      </div>
    );
  }
  
  export default BookCard;
  