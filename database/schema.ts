import { boolean, datetime,  mysqlTable, bigint, varchar  } from "drizzle-orm/mysql-core";

export const user = mysqlTable("users", {
    // Lucia attributes
    id: varchar("id", {length: 15,}).primaryKey(),
    // Custom user attributes
    email: varchar("email", { length: 100 }).notNull().unique(),
    username: varchar("username", { length: 50 }).notNull().unique(),
    verifiedEmail: boolean("verified_email").default(false).notNull(),
    hashedPassword: varchar("hashed_password", {length: 255,}).notNull(),
    apiKey: varchar("apiKey", {length: 255,}).notNull()
});

export const session = mysqlTable("user_sessions", {
    id: varchar("id", {length: 255}).primaryKey(),
    userId: varchar("user_id", {length: 255}).notNull().references(() => user.id),
    expiresAt: datetime("expires_at").notNull()
});