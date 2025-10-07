import BookSchema from "../model/bookSchema.js";

// C - Create
export const addBook = async (book) => {
    return await BookSchema.create(book);
}
// R - Read
export const getAllBooks = async () => {
    return await BookSchema.findAll();
}
// U - Update
// D - Delete