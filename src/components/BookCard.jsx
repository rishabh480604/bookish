import React, { useState } from "react";

const BookCard = ({ book }) => {
  const [isHovered, setIsHovered] = useState(false);

  const coverUrl = book.cover_id
    ? `https://covers.openlibrary.org/b/id/${book.cover_id}-L.jpg`
    : `https://placehold.co/150x220/cccccc/ffffff.png?text=${encodeURIComponent(
        book.title
      )}`;

  const bookUrl = `https://openlibrary.org${book.key}`;

  const author = book.authors?.length ? book.authors[0].name : "Unknown Author";
  const pages = book.edition_count
    ? `${book.edition_count} editions`
    : "N/A";

  return (
    <div
      className={`relative w-48 bg-gray-500 rounded-md overflow-hidden shadow-lg cursor-pointer transform transition-all duration-500 ${
        isHovered ? "scale-110 z-30" : "z-10"
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img
        src={coverUrl}
        alt={book.title}
        className={`w-full h-72 object-cover transition-all duration-500 ${
          isHovered ? "blur-sm brightness-50" : ""
        }`}
      />

      {/* Details overlay with pointer-events control */}
      <div
        className={`absolute inset-0 flex flex-col justify-center items-center text-white p-4 transition-all duration-500 transform ${
          isHovered
            ? "opacity-100 translate-y-0 scale-100 pointer-events-auto"
            : "opacity-0 translate-y-4 scale-95 pointer-events-none"
        }`}
      >
        <h3 className="text-lg font-bold text-center mb-2">{book.title}</h3>
        <p className="text-sm text-gray-200 mb-1 text-center">by {author}</p>
        <p className="text-xs text-gray-300 mb-4 text-center">{pages}</p>
        <a
          href={bookUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-white text-black px-6 py-2 rounded text-sm font-semibold hover:bg-gray-200 transition duration-200 flex items-center gap-2"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M8 5v14l11-7z" />
          </svg>
          Read
        </a>
      </div>

      {/* Gradient overlay */}
      <div
        className={`absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent transition-opacity duration-500 ${
          isHovered ? "opacity-60 pointer-events-none" : "opacity-0 pointer-events-none"
        }`}
      />
    </div>
  );
};

export default BookCard;
