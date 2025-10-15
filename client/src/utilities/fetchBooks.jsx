"use client";

import { useEffect, useState, useCallback } from "react";

// Custom hook to fetch book data
export default function FetchBooks() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true); // Creating loading state for initial fetch
  const [error, setError] = useState(null);     // Creating error state if fetch fails

  // Wrap fetchBooks in a useCallback so we can call it again later
  const fetchBooks = useCallback(async () => {
    try {
      setLoading(true);
      const API = process.env.NEXT_PUBLIC_API_BASE_URL;
      const res = await fetch(`${API}/books`); // Call backend /books route
      const json = await res.json();                          // Parse returned JSON
      const rows = Array.isArray(json) ? json : json?.data || []; // Get the data out from the data object passed in the JSON response
      setBooks(rows);                                          // Store data in books state
      setError(null);
    } catch (err) {
      console.error("Error fetching books:", err);
      setError("Failed to load books.");
    } finally {
      setLoading(false); // Set loading to false regardless of success or failure
    }
  }, []);

  // Initial fetch on mount
  useEffect(() => {
    fetchBooks();
  }, [fetchBooks]);

  // Return refetch function so that other components can trigger updates
  return { books, loading, error, refetch: fetchBooks };
}
