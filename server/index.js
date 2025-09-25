import express from 'express';
import dotenv from "dotenv";
import router from "./routers/router.js";

const app = express();
const PORT = 3000;

app.use("/", router);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})