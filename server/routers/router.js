import express from "express";
import * as controller from "../controllers/bookController.js";

const router = express.Router();

router.get("/books", controller.books);
router.get("/books/:id", controller.getBookById);
router.post("/books", controller.addBook);
router.put("/books", controller.updateBook);
router.delete("/books/:id", controller.deleteBooks);

export default router;