"use server";

import { db } from "@/database";
import { sendEmailUpdateToken } from "./sendEmailUpdateToken";
import { generateVerificationToken } from "@/util/tokens";

interface Props {
    newEmail: string;
    userId: string;
}

// Checks email for an @ symbol with a least one char on either side
function isValidEmail(email: string): boolean {
    return /.+@.+/.test(email);
}

export const requestChangeEmail = async ({
    newEmail,
    userId,
  }: Props) => {
    if (!newEmail || !isValidEmail(newEmail)) {
      return {
        status: 400,
        error: "Please enter a valid email!",
      };
    }

    const emailExists = await db.query.user.findFirst({
        where: (user, { eq }) => eq(user.email, newEmail.toLowerCase()),
    });
    
    // Update email
    if (!emailExists) {
        // Create token
        const token = await generateVerificationToken(newEmail, userId);
        // Send verification to new address
        await sendEmailUpdateToken(newEmail, token.token, userId);
        return {
            status: 200,
            message: `Verification email send to ${newEmail}!`,
        };
    }

    return {
        status: 400,
        error: "Email is already in use!",
    };
};