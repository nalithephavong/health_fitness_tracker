import { Pool } from "pg";
import dotenv from 'dotenv';

dotenv.config();

const itemsPool = new Pool({
    connectionString: process.env.CONNECTION_STRING,
    ssl: {
        rejectUnauthorized: false
    }
    // host: process.env.DB_HOST,
    // port: 5432,
    // user: process.env.DB_USER,
    // database: process.env.DB_NAME,
    // password: process.env.DB_PASSWORD,
});

export default itemsPool;