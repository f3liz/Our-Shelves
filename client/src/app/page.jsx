"use client";

import Link from "next/link";
import { Container, Box, Typography, Button } from "@mui/material";

export default function HomePage() {
  return (
    <Container maxWidth="md">
      <Box sx={{ py: 8 }}>
        <Typography variant="h3" gutterBottom>
          OurShelves
        </Typography>
        <Typography color="text.secondary" sx={{ mb: 3 }}>
          Track the books you’re reading and your progress in each book.
        </Typography>

        <Link href="/books" style={{ textDecoration: "none" }}>
          <Button variant="contained" size="large">View Books</Button>
        </Link>
      </Box>
    </Container>
  );
}