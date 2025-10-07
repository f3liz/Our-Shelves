"use client";

import React, { useState } from "react";
import CenterCard from "@/components/CenterCard";
import styles from "@/styles/ui.module.css";

export default function Page() {
  const [form, setForm] = useState({ name: "", author: "", genre: "", isbn: "" });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const API = process.env.NEXT_PUBLIC_API_BASE_URL;
      const res = await fetch(`${API}/books`, { 
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (res.ok) {
        setMessage("Book added!");
        setForm({ name: "", author: "", genre: "", isbn: "" });
      } else {
        setMessage(data?.error || "Failed to add book.");
      }
    } catch (err) {
      console.error("Error adding book:", err);
      setMessage("Network error.");
    }
  };

  return (
    <CenterCard title="Add a Book">
      <form onSubmit={handleSubmit} data-cy="bookAdd-form" className={styles.form}>
        <label>
          <span>Title</span>
          <input
            name="name"
            type="text"
            placeholder="Book title"
            required
            onChange={handleChange}
            value={form.name}
          />
        </label>

        <label>
          <span>Author</span>
          <input
            name="author"
            type="text"
            placeholder="Author"
            required
            onChange={handleChange}
            value={form.author}
          />
        </label>

        <label>
          <span>Genre</span>
          <input
            name="genre"
            type="text"
            placeholder="Genre"
            required
            onChange={handleChange}
            value={form.genre}
          />
        </label>

        <label>
          <span>ISBN</span>
          <input
            name="isbn"
            type="text"
            placeholder="ISBN"
            required
            onChange={handleChange}
            value={form.isbn}
          />
        </label>

        <div className={styles.actionsRow}>
          <button type="submit" className={styles.btnPrimary}>Add Book</button>
        </div>

        {message && <p className={styles.successText}>{message}</p>}
      </form>
    </CenterCard>
  );
}
