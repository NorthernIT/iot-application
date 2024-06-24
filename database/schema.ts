import { boolean, datetime,  mysqlTable, bigint, varchar, text  } from "drizzle-orm/mysql-core";

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

export const emailVerification = mysqlTable("email_verification", {
    id: varchar("id", {length: 15}).primaryKey(),
    email: varchar("email", { length: 100 }).notNull(),
    token: varchar("token", { length: 100 }).unique().notNull(),
    expires: bigint("active_expires", {
        mode: "number",
    }).notNull(),
});

export const passwordResetToken = mysqlTable("password_reset_tokens", {
    id: varchar("id", {
        length: 15,
    }).primaryKey(),
    email: varchar("email", { length: 100 }).notNull(),
    expires: bigint("active_expires", {
        mode: "number",
    }).notNull(),
    token: varchar("token", { length: 100 }).unique().notNull(),
});

export const session = mysqlTable("user_sessions", {
    id: varchar("id", {length: 255}).primaryKey(),
    userId: varchar("user_id", {length: 255}).notNull().references(() => user.id),
    expiresAt: datetime("expires_at").notNull()
});

export const devices = mysqlTable("devices", {
    deviceEUI: varchar("deviceEUI", {length: 255}).primaryKey(),
    userId: varchar("user_id", {length: 255}).notNull().references(() => user.id),
    deviceName: varchar("devName", {length:255}).notNull(),
    appEUI: varchar("appEUI", {length:255}).notNull(),
    nwAppKey: varchar("nwAppKey", {length:255}).notNull(),
    freq: varchar("freq", {length:255}).notNull(),
    class: varchar("class", {length:255}).notNull()
})