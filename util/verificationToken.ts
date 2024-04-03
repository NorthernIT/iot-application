import { db } from "@/database";

/*
    Retrieves tokens via token
*/

export const getVerificationTokenByToken = async (token: string) => {
    try {
      const token_ = await db.query.emailVerification.findFirst({
        where: (emailVerification, { eq }) => eq(emailVerification.token, token),
      });
  
      return token_;
    } catch (error) {
      return null;
    }
  };
  
  /*
      This will search the verification token table for tokens
      related to the incoming user
  */
  
  export const getVerificationTokenByEmail = async (email: string) => {
    try {
      const token_ = await db.query.emailVerification.findFirst({
        where: (emailVerification, { eq }) => eq(emailVerification.email, email),
      });
  
      return token_;
    } catch (error) {
      return null;
    }
  };