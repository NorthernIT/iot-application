import { validateRequest } from "@/auth/lucia";
import VerificationForm from "@/components/verificationForm";
import { redirect } from "next/navigation";
import React from "react";

const NewVerification = async () => {
    const {session} = await validateRequest();
        if (session) redirect("/");
    return (
        <main className="test" style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
            <VerificationForm />
        </main>
    );
};

export default NewVerification;