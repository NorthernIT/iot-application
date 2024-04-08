"use server";

import { db } from "@/database";
import { user } from "@/database/schema";
import { eq } from "drizzle-orm";

export const changeEmail = async (newEmail: string, userid: string) => {
    try {
        await db.update(user).set({ email: newEmail }).where(eq(user.id, userid));

        return {
            status: 200,
            message: "Updated email!",
        };
    } catch (error: any) {
        return {
            status: 500,
            error: error.message,
        };
    }
};