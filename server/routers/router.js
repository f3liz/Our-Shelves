import express from "express";

const router = express.Router();

router.get("/books", (req, res) => {
    res.status(200);
    res.send("Hello World");
})


export default router;