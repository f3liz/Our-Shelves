"use client";

import Link from "next/link";

export default function NavBar() {
    return (
        <header className="navbar">
            <div className="nav-inner">
                <Link href="/" className="brand">OurShelves</Link>
                <nav className="nav-links">
                    <Link href="/">Home</Link>
                    <Link href="/books">Books</Link>
                    <Link href="/books/addBook">Add Book</Link>
                </nav>
            </div>
        </header>
    );
}