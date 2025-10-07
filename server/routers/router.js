import express from "express";
import * as controller from "../controllers/bookController.js";

const router = express.Router();

// router.get("/books", (req, res) => {
//     res.status(200);
//     res.send("Hello World");
// });
router.get("/books", controller.books);
router.post("/books", controller.addBook);


export default router;