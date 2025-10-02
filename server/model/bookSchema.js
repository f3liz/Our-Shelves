import { DataTypes } from "sequelize";
import sequelize from "../db/db.js";

const BookSchema = sequelize.define("books", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    author: {
        type: DataTypes.STRING,
        allowNull: false
    },
    genre: { 
        type: DataTypes.STRING,
        allowNull: false,
    },
    isbn: {
        type: DataTypes.STRING,
        allowNull: false,
    }
});

await BookSchema.sync({ force: true });

export default BookSchema;