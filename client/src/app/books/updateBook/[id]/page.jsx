"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import CenterCard from "@/components/CenterCard";
import styles from "@/styles/ui.module.css";

export default function UpdateBookPage() {
  const { id } = useParams();
  const router = useRouter();
  const [book, setBook] = useState({
    name: "",
    author: "",
    genre: "",
    isbn: ""
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const res = await fetch(`http://localhost:3000/api/books/${id}`);
        const json = await res.json();
        setBook(json.data);
      } catch (err) {
        console.error("Error fetching book:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchBook();
  }, [id]);

  const handleChange = (e) => {
    setBook({ ...book, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch(`http://localhost:3000/api/books`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: Number(id), ...book })
    });

    if (res.ok) {
      alert("Book updated successfully!");
      router.push("/");
    } else {
      alert("Failed to update book");
    }
  };

  if (loading) {
    return (
      <CenterCard title="Update Book">
        <p>Loading book details…</p>
      </CenterCard>
    );
  }

  return (
    <CenterCard title={`Update: ${book.name}`}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <label>
          Name:
          <input name="name" value={book.name} onChange={handleChange} required />
        </label>
        <label>
          Author:
          <input name="author" value={book.author} onChange={handleChange} required />
        </label>
        <label>
          Genre:
          <input name="genre" value={book.genre} onChange={handleChange} required />
        </label>
        <label>
          ISBN:
          <input name="isbn" value={book.isbn} onChange={handleChange} required />
        </label>
        <button type="submit" className={styles.actionButton}>
          Save Changes
        </button>
      </form>
    </CenterCard>
  );
}