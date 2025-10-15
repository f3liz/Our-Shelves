import * as dataLayer from "../db/booksRepo.js";

export const books = async (req, res) => {
    const data = await dataLayer.getAllBooks();
    res.status(200).json({
        message: "success",
        data
    });
}

export const getBookById = async (req, res) => {
    try {
      const { id } = req.params;
      const book = await dataLayer.getBookById(id);
  
      if (book) {
        res.status(200).json({
          message: "success",
          data: book
        });
      } else {
        res.status(404).json({
          message: "not found",
          data: null
        });
      }
    } catch (error) {
      res.status(500).json({
        message: "error fetching book",
        error: error.message
      });
    }
  };  

export const addBook = async (req, res) => {
    const book = req.body;
    const bookAdded = await dataLayer.addBook(book);

    res.status(201).json({
        message: "success",
        data: bookAdded
    });
}

export const updateBook = async (req, res) => {
    const updatedBook = req.body;
    const [ savedBook ] = await dataLayer.updateBook(updatedBook);

    if(savedBook) {
        res.status(200).json({
            message: "success",
            data: savedBook
        })
    } else {
        res.status(404).json({
            message: "failed",
            data: null
        })
    }
}

export const deleteBooks = async (req, res) => {
  const id = req.params.id;
  const result = await dataLayer.deleteBook(id);

  if(result) {
    res.status(200).json({
      message: "success"
    })
  } else {
    res.status(404).json({
      message: "failed - book not found"
    })
  }
}