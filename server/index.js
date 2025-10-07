import express from 'express';
import router from "./routers/router.js";
import BookSchema from './model/bookSchema.js';
import cors from 'cors';

const app = express();
const PORT = 3000;

BookSchema.create({
    id: 1,
    name: "The Hobbit",
    author: "J.R.R. Tolkien",
    genre: "Fantasy",
    isbn: "978-0547928227"
})

const book = await BookSchema.findAll();
console.log(book);

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", router);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})