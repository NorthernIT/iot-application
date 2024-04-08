"use client";

import { newVerification } from "@/actions/newVerification";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
// import { toast } from "@/components/ui/use-toast";
import toast, { Toaster } from "react-hot-toast";
import { BeatLoader } from "react-spinners";
import CardWrapper from "./CardWrapper";


const VerificationForm = () => {
    const [error, setError] = useState<string | undefined>();
    const [sucess, setSucess] = useState<string | undefined>();

    const searchParams = useSearchParams();

    const token = searchParams.get("token");

    const router = useRouter();

    const onSubmit = useCallback(() => {
        if (!token) {
        console.log("Token null");
        setError("Missing Token");
        toast.error("Missing Token!");
        return;
        }

        newVerification(token)
        .then((data) => {
            if (data.status === 200) {
                setSucess(data.message);
                toast.success("Email Verified!");
                router.push("/auth/sign-in");
            } else {
                setError(data.message);
                toast.error("An error occured");
            }
        })
        .catch((error) => {
            setError("Something went wrong");
            toast.error("Invalid Token!");
            console.log(error);
        });
    }, [token]);

    useEffect(() => {
        onSubmit();
    }, [onSubmit]);

    return (
        <CardWrapper
        headerLabel={
            error ? "Unable to confirm address" : "Confirming your email address"
        }
        backButtonLabel={""}
        backButtonHref={""}
        >
        <div className="flex flex-col w-full items-center justify-center">
            {!sucess && !error && <BeatLoader />}
            {sucess && <p>{sucess}</p>}
            {error && <p>{error}</p>}
        </div>
        <Toaster />
        </CardWrapper>
);
};

export default VerificationForm;