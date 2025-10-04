"use client";

import { useEffect, useState } from "react";

// Custom hook to fetch book data
export default function FetchBooks() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true); // Creating loading state for initial fetch
  const [error, setError] = useState(null);     // Creating error state if fetch fails

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await fetch("http://localhost:3000/books"); // Call backend /books route
        const data = await res.json();                          // Parse returned JSON
        setBooks(data);                                          // Store data in books state
      } catch (err) {
        console.error("Error fetching books:", err);
        setError("Failed to load books.");
      } finally {
        setLoading(false); // Set loading to false regardless of success or failure
      }
    };

    fetchBooks();
  }, []);

  return { books, loading, error };
}
