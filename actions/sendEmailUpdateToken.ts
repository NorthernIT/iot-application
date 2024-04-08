"use server";

import { NextResponse, NextRequest } from "next/server";
const nodemailer = require("nodemailer");

// https://nodemailer.com/

export const sendEmailUpdateToken = async (
  email: string,
  token: string,
  userId: string,
) => {
  // Setup nodemailer 
  const transporter = nodemailer.createTransport({
    host: "mail.northernit.ca",
    port: 465,
    auth: {
      user: process.env.NODEMAILER_USER!,
      pass: process.env.NODEMAILER_PASSWORD!,
    },
    secure: true,
  });

  // Must wrap the verify and sendMail functions in Promises
  // Just using a regular await causes everything to hang


  await new Promise((resolve, reject) => {
    // verify connection configuration
    transporter.verify(function (error: any, success: any) {
      if (error) {
        console.log(error);
        reject(error);
      } else {
        console.log("Server is ready to take our messages");
        resolve(success);
      }
    });
  });

  try {
    await new Promise((resolve, reject) => {
      transporter.sendMail(
        {
          from: process.env.NODEMAILER_USER!,
          to: email,
          subject: "Verify your new email address",
          html:
            process.env.NODE_ENV === "development"
              ? `
        <h1>Verify your email address</h1>
        <a href="${process.env.BASE_URL}/auth/email-reset?token=${token}&email=${email}&id=${userId}" target="#">Click here to verify</a>
        `
              : `
        <h1>Verify your email address</h1>
        <a href="${process.env.BASE_URL}/auth/email-reset?token=${token}&email=${email}&id=${userId}" target="#">Click here to verify</a>
        `,
        },
        (err: any, info: any) => {
          if (err) {
            console.error(err);
            reject(err);
          } else {
            console.log(info);
            resolve(info);
          }
        }
      );
    });

    return NextResponse.json({
      status: 200,
      message: "Verification email sent!",
    });
  } catch (error) {
    console.log(error);
    NextResponse.json({ status: 500, message: "COULD NOT SEND MESSAGE" });
  }
};