"use client";

import CenterCard from "@/components/CenterCard";
import styles from "@/styles/ui.module.css";
import FetchBooks from "@/utilities/fetchBooks";
import { useRouter } from "next/navigation";

export default function BooksPage() {
  const { books, loading, error } = FetchBooks();
  const router = useRouter();

  const handleDelete = async (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this book?");
    if (!confirmed) return;
  
    try {
      const API = process.env.NEXT_PUBLIC_API_BASE_URL;
      const res = await fetch(`${API}/books/${id}`, {
        method: "DELETE"
      });
  
      if (!res.ok) throw new Error("Delete failed");
  
      // Refresh the list after deletion
      router.refresh();
    } catch (err) {
      console.error("Failed to delete book:", err);
    }
  };
  

  if (loading) {
    return (
      <CenterCard title="Books">
        <p>Loading…</p>
      </CenterCard>
    );
  }

  if (error) {
    return (
      <CenterCard title="Books">
        <p className={styles.errorText}>{error}</p>
      </CenterCard>
    );
  }

  return (
    <CenterCard title="Books">
      {books.length === 0 ? (
        <p className="muted">No books found.</p>
      ) : (
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Author</th>
                <th>Genre</th>
                <th>ISBN</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {books.map((b, i) => (
                <tr key={b.id ?? i}>
                  <td>{b.id ?? "-"}</td>
                  <td>{b.name ?? "-"}</td>
                  <td>{b.author ?? "-"}</td>
                  <td>{b.genre ?? "-"}</td>
                  <td>{b.isbn ?? "-"}</td>
                  <td>
                    <button
                      className={styles.actionButton}
                      onClick={() => router.push(`/books/updateBook/${b.id}`)}
                    >
                      Update
                    </button>
                    <button
                      className={`${styles.actionButton} ${styles.btnDelete}`}
                      onClick={() => handleDelete(b.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </CenterCard>
  );
}