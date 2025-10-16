import "dotenv/config";
import express from 'express';
import router from "./routers/router.js";
import BookSchema from './model/bookSchema.js';
import cors from 'cors';

const app = express();

const PORT = process.env.SERVER_PORT || 3000;
const HOST = "0.0.0.0";

const book = await BookSchema.findAll();
console.log(book);

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/favicon.ico", (_req, res) => res.sendStatus(204));

app.use("/", router);

BookSchema.create({
    id: 1,
    name: "The Hobbit",
    author: "J.R.R. Tolkien",
    genre: "Fantasy",
    isbn: "978-0547928227"
})

app.listen(PORT, HOST, () => {
    console.log(`Server is running on http://${HOST}:${PORT}`);
})