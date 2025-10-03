import * as dataLayer from "../db/booksRepo.js";

export const books = async (req, res) => {
    const data = await dataLayer.getAllBooks();
    res.status(200).json({
        message: "success",
        data
    });
}