"use server";

import { lucia } from "@/auth/lucia";
import { db } from "@/database";
import { passwordResetToken, user } from "@/database/schema";
import { eq } from "drizzle-orm";
import { Argon2id } from "oslo/password";


/*
  Steps

  Validate reset token

  get user info from email attached to token

  Reset password
    Invalidate user sessions
    Hash new passowrd
    Update password

*/

export const resetPassword = async (token: string, newPassword: string) => {
    // Validate token
    const tokenExists = await db.query.passwordResetToken.findFirst({
      where: (passwordResetToken, { eq }) => eq(passwordResetToken.token, token),
    });
  
    if (!tokenExists) {
      return {
        message: "Token doesn't exists",
        status: 400,
      };
    }
    // Get userId from the email attached to the token
    const authUser = await db
      .select({
        id: user.id,
      })
      .from(user)
      .where(eq(user.email, tokenExists.email));
  
    if (!authUser) {
      return {
        message: "No user attached to this token",
        status: 500,
      };
    }
    // Reset password
    try {
  
      await lucia.invalidateUserSessions(authUser[0].id)
  
      const hashedPassword = await new Argon2id().hash(newPassword)
  
      await db
        .update(user)
        .set({hashedPassword: hashedPassword})
        .where(eq(user.id,authUser[0].id))

      // Delete token after password changed
      await db.delete(passwordResetToken).where(eq(passwordResetToken.id, tokenExists.id));
  
      return {
        message: "Password reset!",
        status: 200,
      };
    } catch (error) {
      console.error(error);
      return {
        message: "Error validating user!",
        status: 500,
      };
    }

};