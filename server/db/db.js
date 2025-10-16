import mysql from "mysql2/promise";
import dotenv from "dotenv";
import { Sequelize } from "sequelize";

// for env variables
dotenv.config();

const host = process.env.DB_HOST;
const PORT = process.env.DB_PORT;
const database = process.env.DB_NAME;
const user = process.env.DB_USER;
const password = process.env.DB_PASSWORD;

// check if database exists
const makeDb = async () => {
    const connection = await mysql.createConnection({ host, user, password });
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${database}\`;`);
    await connection.end();
    console.log(`Database ${database} is ready.`);
};

await makeDb();

// Sequelize connection
const sequelize = new Sequelize(database, user, password, {
    host,
    port: PORT,
    dialect: "mysql",
    logging: msg => console.log(`SQL: ${msg}`)
});

try {
    await sequelize.authenticate();
    console.log("Connected to DB!");
} catch(err) {
    console.log("Unable to connect to DB:", err);
}

export default sequelize;