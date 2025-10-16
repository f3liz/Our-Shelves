"use client";

import Link from "next/link";
import CenterCard from "@/components/CenterCard";
import styles from "@/styles/ui.module.css";

export default function HomePage() {
  return (
    <CenterCard
      title="Welcome to OurShelves"
      subtitle="Track the books you’re reading and your progress in each one."
      actions={
        <div className={styles.actionsRow}>
          <Link href="/books" className={styles.btnPrimary}>View Books</Link>
          <Link href="/books/addBook" className={styles.btnGhost}>Add a Book</Link>
        </div>
      }
    >
    </CenterCard>
  );
}