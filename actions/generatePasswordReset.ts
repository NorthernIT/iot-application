"use server";

import {v4 as uuidv4 } from "uuid";
import { db } from "@/database";
import { passwordResetToken } from "@/database/schema";
import { eq } from "drizzle-orm";
import { generateId } from "@/util/generateId";
import { getPasswordResetToken } from "@/util/verificationToken";

export const generatePasswordResetToken = async (email: string) => {
    // Check to see if email exists in users
    const emailexists = await db.query.user.findFirst({
        where: (user, { eq }) => eq(user.email, email.toLowerCase()),
    });

    if (emailexists) {
        // generate token
        const token = uuidv4();
        // Tokens expire after an hour
        const expiresInMilliseconds = 60 * 60 * 1000; // 60 minutes in milliseconds
        const expires = Number(new Date().getTime() + expiresInMilliseconds);

        const currentToken = await getPasswordResetToken(email);

        // insert into password reset token table, delete any tokens that are related to the user requesting
        if (currentToken) {
        await db
            .delete(passwordResetToken)
            .where(eq(passwordResetToken.email, currentToken.email));
        }
        await db.insert(passwordResetToken).values({
            id: generateId(),
            email: email,
            token: token,
            expires: expires,
        });

        return token
    }

    return null;
};