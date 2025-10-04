"use client";

import {
  Container,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody
} from "@mui/material";
import FetchBooks from "@/utilities/fetchBooks";

export default function BooksPage() {
  const { books, loading, error } = FetchBooks();

  if (loading) return <Typography sx={{ p: 2 }}>Loading…</Typography>;
  if (error)   return <Typography sx={{ p: 2 }} color="error.main">{error}</Typography>;

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h5" gutterBottom>Books</Typography>

      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Title</TableCell>
            <TableCell>Author</TableCell>
            <TableCell>Genre</TableCell>
            <TableCell>ISBN</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {books.map((b, i) => (
            <TableRow key={b.id ?? i}>
              <TableCell>{b.id ?? "-"}</TableCell>
              <TableCell>{b.name ?? "-"}</TableCell>
              <TableCell>{b.author ?? "-"}</TableCell>
              <TableCell>{b.genre ?? "-"}</TableCell>
              <TableCell>{b.isbn ?? "-"}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {books.length === 0 && (
        <Typography color="text.secondary" sx={{ mt: 2 }}>
          No books found.
        </Typography>
      )}
    </Container>
  );
}