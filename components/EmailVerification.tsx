"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { BeatLoader } from "react-spinners";
import { emailUpdateVerification } from "@/actions/emailUpdateVerification";
import CardWrapper from "./CardWrapper";

const EmailVerification = () => {
    const [error, setError] = useState<string | undefined>();
    const [sucess, setSucess] = useState<string | undefined>();
  
    const searchParams = useSearchParams();
  
  //   Parsed search params
  //   https://nextjs.org/docs/app/api-reference/functions/use-search-params
    const token = searchParams.get("token");
    const userId = searchParams.get("id");
  
    const router = useRouter();
  
  // Runs on page load - will run twice in development environment
  // This is normal due to being in a use effect
  
    const onSubmit = useCallback(() => {
      // No token found in url string
      if (!token) {
        console.log("Token null");
        setError("Missing Token");
        toast.error("Missing Token!");
        return;
      }
  
      emailUpdateVerification(token, userId)
        .then(async (data) => {
          if (data.status === 200) {
            setSucess(data.message);
            toast.success("Email udpated!");
            router.push("/profile");
          } else {
            setError(data.message);
            toast.error("An error occured");
          }
        })
        .catch((error) => {
          setError("Couldn't update email!");
          toast.error("Couldn't update email!");
          console.error(error);
        });
    }, [token]);
  
    useEffect(() => {
      onSubmit();
    }, [onSubmit]);
    return (
      <CardWrapper
        headerLabel={
          error ? "Unable to update address" : "Updating your email address"
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
  
  export default EmailVerification;