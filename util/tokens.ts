import {v4 as uuidv4 } from "uuid";
import {db} from "@/database";
import { emailVerification } from "@/database/schema";
import { eq } from "drizzle-orm";
import { getVerificationTokenByEmail, getVerificationTokenByToken } from "./verificationToken";

export const generateVerificationToken = async (
    email: string,
    userId: string
  ) => {
    const token = uuidv4();
    // Tokens expire after an hour
    const expiresInMilliseconds = 60 * 60 * 1000; // 60 minutes in milliseconds
    const expires = Number(new Date().getTime() + expiresInMilliseconds);
  
    const currentToken = await getVerificationTokenByEmail(email);
  
    // If a token exists for the user delete and create a new one
    if (currentToken) {
      await db
        .delete(emailVerification)
        .where(eq(emailVerification.id, currentToken.id));
    }
    await db.insert(emailVerification).values({
      id: userId,
      email: email,
      token: token,
      expires: expires,
    });
  
    return {
      id: userId,
      email: email,
      token: token,
      expires: expires,
    };
  };
  
  export const validateEmailToken = async (token: string, userId: string) => {
    const verified = await getVerificationTokenByToken(token);
    if (!verified) {
      return {
        message: "Unable to find token",
        status: 500,
      };
    } else {
      if (verified.id === userId) {
        return true;
      }
    }
  
    return {
      message: "Error validating token",
      status: 500,
    };
  };