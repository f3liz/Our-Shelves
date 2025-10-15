import BookSchema from "../model/bookSchema.js";

// C - Create
export const addBook = async (book) => {
    return await BookSchema.create(book);
}
// R - Read
export const getAllBooks = async () => {
    return await BookSchema.findAll();
}
// R - Read one
export const getBookById = async (id) => {
    return await BookSchema.findByPk(id);
  };
// U - Update
export const updateBook = async (book) => {
    return await BookSchema.update(book, {
        where: {
            id: book.id
        }
    })
}
// D - Delete
export const deleteBook = async (book) => {
    return await BookSchema.destroy({
        where: {
            id: id
        }
    })
}