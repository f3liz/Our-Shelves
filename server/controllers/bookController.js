import * as dataLayer from "../db/booksRepo.js";

export const books = async (req, res) => {
    const data = await dataLayer.getAllBooks();
    res.status(200).json({
        message: "success",
        data
    });
}

export const addBook = async (req, res) => {
    const book = req.body;
    const bookAdded = await dataLayer.addBook(book);

    res.status(201).json({
        message: "success",
        data: bookAdded
    });
}