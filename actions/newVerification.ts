"use server";

import { db } from "@/database";
import { getVerificationTokenByToken } from "@/util/verificationToken";
import { user, emailVerification } from "@/database/schema";
import { eq } from "drizzle-orm";

/*
  Steps

  Check to see if a valid token was passed

  Check token expiry

  Check if there is a valid email attached to the token

  If the token and email are both valid, validate user email

*/

export const newVerification = async (token: string) => {
    const existingToken = await getVerificationTokenByToken(token);

    if (!existingToken) {
        return { message: "Token does not exist!", status: 500 };
    }

    const hasExpired = new Date(existingToken.expires) < new Date();

    if (hasExpired) {
        return { message: "Token has expired!", status: 500 };
    }

    const existingUser = await db.query.user.findFirst({
        where: (user, { eq }) => eq(user.email, existingToken.email),
    });

    if (!existingUser) {
        return { message: "Email does not exist!", status: 400 };
    }

    //   Update user

    await db
        .update(user)
        .set({ verifiedEmail: true })
        .where(eq(user.email, existingToken.email));

    //   Delete token

    await db
        .delete(emailVerification)
        .where(eq(emailVerification.id, existingToken.id));

    return { message: "Email verified!", status: 200 };
};