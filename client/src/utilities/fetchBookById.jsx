"use client";

import { useEffect, useState } from "react";

export default function FetchBookById(id) {
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return; // wait until the id is available

    const fetchBook = async () => {
      try {
        const API = process.env.NEXT_PUBLIC_API_BASE_URL;
        const res = await fetch(`${API}/books/${id}`);
        const json = await res.json();

        if (!res.ok) throw new Error(json.message || "Failed to fetch book");

        setBook(json.data);
      } catch (err) {
        console.error("Error fetching book:", err);
        setError("Failed to load book details.");
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [id]);

  return { book, loading, error };
}