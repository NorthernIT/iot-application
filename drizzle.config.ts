import type { Config } from "drizzle-kit";
import "@/database/config";

export default {
    schema: "./database/schema.ts",
    out: "./database/migrations",
    driver: "mysql2",
    dbCredentials: {
        host: process.env.DB_HOST!,
        user: process.env.DB_USER,
        database: process.env.DB!,
        password: process.env.DB_PASSWORD,
        port: 3306,
    },
    verbose: true,
    strict: true,
} satisfies Config;