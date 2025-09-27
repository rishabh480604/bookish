import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import BookCard from "./BookCard";
import ErrorModal from "./ErrorModal";

const AdvanceSearch = () => {
  const { title } = useParams();
  
  // Query fields
  const [query, setQuery] = useState(title || "");
  const [author, setAuthor] = useState("");
  const [subject, setSubject] = useState("");
  const [publisher, setPublisher] = useState("");
  const [isbn, setIsbn] = useState("");
  const [language, setLanguage] = useState("");
  const [fulltext, setFulltext] = useState("");
  const [startYear, setStartYear] = useState("");
  const [endYear, setEndYear] = useState("");
  const [booksPerPage, setBooksPerPage] = useState(10); // Number of books per page

  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [limit,setLimit] =useState(50);
 

  // Build OpenLibrary search query
  const buildQuery = () => {
    let params = [];
    if (query) params.push(`title=${encodeURIComponent(query)}`);
    if (author) params.push(`author=${encodeURIComponent(author)}`);
    if (subject) params.push(`subject=${encodeURIComponent(subject)}`);
    if (publisher) params.push(`publisher=${encodeURIComponent(publisher)}`);
    if (isbn) params.push(`isbn=${encodeURIComponent(isbn)}`);
    if (language) params.push(`language=${encodeURIComponent(language)}`);
    if (fulltext) params.push(`q=${encodeURIComponent(fulltext)}`);
    if (startYear) params.push(`first_publish_year>=${startYear}`);
    if (endYear) params.push(`first_publish_year<=${endYear}`);
    // We fetch up to 100 books maximum to paginate client-side
    params.push(`limit=${limit}`);
    return params.join("&");
  };

  // Fetch books
  const searchBooks = async () => {
    const queryString = buildQuery();
    if (!queryString) {
      setBooks([]);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const resp = await fetch(`https://openlibrary.org/search.json?${queryString}`);
      if (!resp.ok) throw new Error("Failed to fetch");
      const data = await resp.json();
      setBooks(data.docs || []);
      setPage(1);
    } catch (err) {
      console.error(err);
      setError("Failed to load books. Please check your network connection or try again later.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch on mount if title exists in URL
  useEffect(() => {
    if (title) {
      setQuery(title);
      searchBooks();
    }
    // eslint-disable-next-line
  }, [title]);

  // Pagination calculations
  const totalPages = Math.ceil(books.length / booksPerPage);
  const startIndex = (page - 1) * booksPerPage;
  const currentBooks = books.slice(startIndex, startIndex + booksPerPage);

  const handleNext = () => {
    if (page < totalPages) setPage((prev) => prev + 1);
  };

  const handlePrev = () => {
    if (page > 1) setPage((prev) => prev - 1);
  };
  

    return (
      
      <div className="p-4 min-h-[76vh] bg-white text-amber-600">
        {error && <ErrorModal message={error}/>}
        
        <h2 className="text-2xl font-bold mb-4 text-amber-400">Advanced Search</h2>
  
        {/* Advanced Search Form */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
          <input
            type="text"
            placeholder="Title"
            className="p-2 border rounded w-full text-black"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <input
            type="text"
            placeholder="Author"
            className="p-2 border rounded w-full text-black"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
          <input
            type="text"
            placeholder="Subject / Genre"
            className="p-2 border rounded w-full text-black"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />
          <input
            type="text"
            placeholder="Publisher"
            className="p-2 border rounded w-full text-black"
            value={publisher}
            onChange={(e) => setPublisher(e.target.value)}
          />
          <input
            type="text"
            placeholder="ISBN"
            className="p-2 border rounded w-full text-black"
            value={isbn}
            onChange={(e) => setIsbn(e.target.value)}
          />
          <input
            type="text"
            placeholder="Language (eng, hin, fre)"
            className="p-2 border rounded w-full text-black"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
          />
          <input
            type="text"
            placeholder="Full-text / Quote"
            className="p-2 border rounded w-full text-black"
            value={fulltext}
            onChange={(e) => setFulltext(e.target.value)}
          />
          <input
            type="number"
            placeholder="Start Year"
            className="p-2 border rounded w-full text-black"
            value={startYear}
            onChange={(e) => setStartYear(e.target.value)}
          />
          <input
            type="number"
            placeholder="End Year"
            className="p-2 border rounded w-full text-black"
            value={endYear}
            onChange={(e) => setEndYear(e.target.value)}
          />
          <div className="flex items-center space-x-2">
    <label htmlFor="booksPerPage" className="text-gray-700">Books Per Page:</label>
    <input
      id="booksPerPage"
      type="number"
      placeholder="Books per page"
      className="p-2 border rounded w-full text-black"
      value={booksPerPage}
  
      onChange={(e) => setBooksPerPage(Number(e.target.value))}
    />
  </div>
  <div className="flex items-center space-x-2">
  <label className="text-black">Search Limit :</label>
    <input
      id="limit"
      type="number"
      placeholder="Books per page"
      className="p-2 border rounded w-full text-black"
      value={limit}
      onChange={(e) => setLimit(Number(e.target.value))}
    />
  </div>
          
        </div>
        <br/>
        <button
          onClick={searchBooks}
          className="p-6 bg-amber-600 text-white rounded hover:bg-amber-700 mb-6"
        >
           Search 
        </button>
        <br/>
  
        {loading && <div>Loading...</div>}
        {/* {error && <div className="text-red-500">{error}</div>} */}
  
        {/* Books Grid */}
        {currentBooks.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {currentBooks.map((b, idx) => (
                <BookCard
                  key={b.key || idx}
                  book={{
                    cover_id: b.cover_i,
                    title: b.title,
                    authors: b.author_name
                      ? b.author_name.map((name) => ({ name }))
                      : [],
                    edition_count: b.edition_count,
                    key: b.key,
                  }}
                />
              ))}
            </div>
            <br/>
  
            {/* Pagination Controls */}
            <div className="flex justify-center mt-6 space-x-4 p-6">
              <button
                onClick={handlePrev}
                disabled={page === 1}
                className="px-4 py-2 bg-amber-600/30 rounded hover:bg-amber-600/60 mx-4"
              >
                Previous
              </button>
              <span className="px-2 py-2">
                Page {page} of {totalPages}
              </span>
              <button
                onClick={handleNext}
                disabled={page === totalPages}
                className="px-4 py-2 bg-amber-600/30 rounded hover:bg-amber-600/60 mx-4"
              >
                 Next 
              </button>
            </div>
            <br/>
          </>
        ) : (
          !loading && <div>No books found.</div>
        )}
      </div>
    );
  
  

  };

export default AdvanceSearch;
