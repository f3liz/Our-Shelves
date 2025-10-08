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
        const API = process.env.NEXT_PUBLIC_API_BASE_URL;
        const res = await fetch(`${API}/books`); // Call backend /books route
        const json = await res.json();                          // Parse returned JSON
        const rows = Array.isArray(json) ? json : json?.data || []; // Get the data out from the data object passed in the JSON response
        setBooks(rows);                                          // Store data in books state
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
