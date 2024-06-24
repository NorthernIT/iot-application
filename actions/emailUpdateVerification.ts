"use server";

import { db } from "@/database";
import { getVerificationTokenByToken } from "@/util/verificationToken";
import { emailVerification } from "@/database/schema";
import { eq } from "drizzle-orm";
import { changeEmail } from "./changeEmail";

export const emailUpdateVerification = async (
    token: string,
    userId: string | null
) => {
    const existingToken = await getVerificationTokenByToken(token);

    if (!existingToken) {
        return {
            status: 500,
            message: "Token does not exist!"
        };
    }

    const hasExpired = new Date(existingToken.expires) < new Date();

    if (hasExpired) {
        return {
            status: 500,
            message: "Token has expired"
        };
    }

    if (userId) {
        // update email
        await changeEmail(existingToken.email, userId);
    } else {
        return {
            status: 400,
            message: "No id provided!"
        }
    }
    
    // Delete token after email has been verified
    await db.delete(emailVerification).where(eq(emailVerification.id, existingToken.id));

    return {
        status: 200,
        message: "Email verified!"
    }
}