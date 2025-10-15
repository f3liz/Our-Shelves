"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import CenterCard from "@/components/CenterCard";
import styles from "@/styles/ui.module.css";
import FetchBookById from "@/utilities/fetchBookById";

export default function UpdateBookPage() {
  const { id } = useParams();
  const router = useRouter();
  const { book, loading, error } = FetchBookById(id);

  const [formData, setFormData] = useState({
    name: "",
    author: "",
    genre: "",
    isbn: ""
  });

  const [status, setStatus] = useState(""); // holds success or error text
  const [statusType, setStatusType] = useState(""); // "success" or "error"

  // Sync fetched book into formData when loaded
  if (book && formData.name === "" && !loading) {
    setFormData({
      name: book.name,
      author: book.author,
      genre: book.genre,
      isbn: book.isbn
    });
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const API = process.env.NEXT_PUBLIC_API_BASE_URL;
      const res = await fetch(`${API}/books`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: Number(id), ...formData })
      });

      if (!res.ok) throw new Error("Update failed");

      setStatus("Book updated successfully!");
      setStatusType("success");

      // Give the message time to show, then redirect
      setTimeout(() => {
        router.push("/books");
      }, 1200);
    } catch (err) {
      console.error(err);
      setStatus("Failed to update book.");
      setStatusType("error");
    }
  };

  if (loading) {
    return (
      <CenterCard title="Update Book">
        <p>Loading book details…</p>
      </CenterCard>
    );
  }

  if (error) {
    return (
      <CenterCard title="Update Book">
        <p className={styles.errorText}>{error}</p>
      </CenterCard>
    );
  }

  return (
    <CenterCard title={`Update: ${formData.name || "Book"}`}>
      {/* Inline success/error message */}
      {status && (
        <p
          className={
            statusType === "success"
              ? styles.statusSuccess
              : styles.statusError
          }
        >
          {status}
        </p>
      )}

      <form className={styles.form} onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Author:
          <input
            name="author"
            value={formData.author}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Genre:
          <input
            name="genre"
            value={formData.genre}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          ISBN:
          <input
            name="isbn"
            value={formData.isbn}
            onChange={handleChange}
            required
          />
        </label>
        <button type="submit" className={styles.btnPrimary}>
          Save Changes
        </button>
      </form>
    </CenterCard>
  );
}