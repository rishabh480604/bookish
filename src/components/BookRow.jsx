import React, { useEffect, useState, useRef } from "react";
import BookCard from "./BookCard";
import ErrorModal from "./ErrorModal";

const BookRow = ({ title, subject }) => {
  const [books, setBooks] = useState([]);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const rowRef = useRef(null);
  const [error, setError] = useState(null); 

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await fetch(
          `https://openlibrary.org/subjects/${subject}.json?limit=10`
        );
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        const data = await res.json();
        setBooks(data.works || []);
      } catch (err) {
        console.error("Error fetching books:", err);
        setError("Failed to load books. Please check your network connection or try again later.");
      }
    };
  
    fetchBooks();
  }, [subject]);

  // Check scroll position to show/hide arrows
  const checkScrollPosition = () => {
    if (rowRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = rowRef.current;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  // Scroll left/right
  const scroll = (direction) => {
    if (rowRef.current) {
      const scrollAmount = rowRef.current.clientWidth * 0.8; // scroll 80% of visible width
      if (direction === "left") {
        rowRef.current.scrollBy({ left: -scrollAmount, behavior: "smooth" });
      } else {
        rowRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
      }
    }
  };

  useEffect(() => {
    const currentRow = rowRef.current;
    if (currentRow) {
      currentRow.addEventListener("scroll", checkScrollPosition);
      // Initial check
      setTimeout(checkScrollPosition, 100);
      
      return () => currentRow.removeEventListener("scroll", checkScrollPosition);
    }
  }, [books]);

  if(error){
    console.log(error);
    return ( <ErrorModal message={error} />);
  }else{
    return(
    <div className="mb-16 relative m-6">
        <br/   >
      {/* Section title with proper spacing */}
      <h2 className="text-2xl font-bold text-black mb-6 p-4 md:px-8 lg:px-12 text-left my-6">
        {title}
      </h2>

      <div className="relative px-4 md:px-8 lg:px-12 group">
        {/* Left arrow - only show on row hover and when scrollable */}
        {showLeftArrow && (
          <button
            className="absolute left-2 md:left-6 lg:left-10 top-1/2 -translate-y-1/2 bg-black bg-opacity-70 text-white p-3 rounded-full z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-opacity-90 hover:scale-110"
            onClick={() => scroll("left")}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
            </svg>
          </button>
        )}

        {/* Right arrow - only show on row hover and when scrollable */}
        {showRightArrow && (
          <button
            className="absolute right-2 md:right-6 lg:right-10 top-1/2 -translate-y-1/2 bg-black bg-opacity-70 text-white p-3 rounded-full z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-opacity-90 hover:scale-110"
            onClick={() => scroll("right")}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8.59 16.59L10 18l6-6-6-6-1.41 1.41L13.17 12z"/>
            </svg>
          </button>
        )}

        {/* Horizontal scroll row */}
        <div
          ref={rowRef}
          className="flex gap-4 overflow-x-hidden hover:overflow-x-auto transition-all duration-300 pb-4"
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none'
          }}
        >
          {books.map((book, index) => (
            <div key={`${book.key}-${index}`} className="flex-shrink-0 min-w-0">
              <BookCard book={book} />
            </div>
          ))}
        </div>
      </div>
      <br/>
    </div>
    );
  }
    

    
  
};

export default BookRow;