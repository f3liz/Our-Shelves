"use client";

import CenterCard from "@/components/CenterCard";
import styles from "@/styles/ui.module.css";
import FetchBooks from "@/utilities/fetchBooks";

export default function BooksPage() {
  const { books, loading, error } = FetchBooks();

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
                      onClick={() => window.location.href = `/updateBook/${b.id}`}
                    >
                      Update
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