import { drizzle } from "drizzle-orm/mysql2";
import { createPool } from "mysql2/promise";
import { DrizzleMySQLAdapter } from "@lucia-auth/adapter-drizzle";
import { session, user } from "@/database/schema";
import * as schema from "./schema";


export const pool = createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB,
    password: process.env.DB_PASSWORD,
    port: 3306,
});

export const db = drizzle(pool, { schema, mode: "default" });

export const adapter = new DrizzleMySQLAdapter (db,session,user);