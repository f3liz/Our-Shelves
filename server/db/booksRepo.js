import BookSchema from "../model/bookSchema.js";

// C - Create
// R - Read
export const getAllBooks = async () => {
    return await BookSchema.findAll();
}
// U - Update
// D - Delete