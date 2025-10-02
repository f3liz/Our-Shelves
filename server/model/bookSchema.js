import { DataTypes } from "sequelize";
import sequelize from "../db/db";

const BookSchema = sequelize.define("pet", {
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
        type: DataTypes.INTEGER,
        allowNull: false,
    }
});

await BookSchema.sync({ force: true });

export default BookSchema;