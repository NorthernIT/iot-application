"use client";

import React, {useState} from "react";
import { Card, CardContent, CardHeader } from "./ui/card";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import { requestChangeEmail } from "@/actions/requestChangeEmail";
import { signOut } from "@/actions/auth.action";
import { Button } from "./ui/button";

const UserProfile = ({ user }: { user: any }) => {
    const [showApiKey, setShowApiKey] = useState(false);
    const [email, setEmail] = useState("");

    const router = useRouter();
    
    const handleToggleApiKey = () => {
        setShowApiKey(!showApiKey);
    };

    async function handleUpdateEmail() {
        // set toaster notification
        const toastId = toast.loading("Updating email ...");
        // Attempt change
        const response = await requestChangeEmail({
            newEmail: email,
            userId: user.id,
        });

        if (!response) {
            toast.error(`Internal server error.`, {id: toastId})
        }

        // 400 = user error 500 = server error
        if (response.status === 400 || response.status === 500) {
            toast.error(response.error!, { id: toastId });
        }
    
        if (response.status === 200) {
            toast.success(`${response.message}`, { id: toastId });
            await setTimeout(() => {}, 500);
            router.refresh();
        }
    }

    return (
        <Card className="w-full min-w-[50rem] md:w-[30rem] h-fit shadow-md pt-[2rem] md:pt-[3rem]">
        <CardHeader className="flex items-center justify-center gap-[1rem]">
            {/* Title */}
            <h1 className={"text-3xl font-semibold"}>Welcome to your Profile</h1>
        </CardHeader>
        <CardContent className="flex flex-col gap-[1rem]">
            {/* Username */}
            <div className="w-full flex flex-col px-[2rem] gap-[1rem] my-[1rem]">
            <h3 className="">Username:</h3>
            <p className="text-gray-600">{user.username}</p>
            </div>
            {/* Email */}
            <div className="w-full flex flex-col px-[2rem] gap-[1rem] my-[1rem]">
                <h3 className="">Email:</h3>
                <p className="">{user.email}</p>
                <div className="flex flex-row gap-[1rem]">
                    <input
                        onChange={(event) => setEmail(event.target.value)}
                        className="w-48 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                        id="emailInput"
                        type="text"
                        placeholder="Enter new email"
                    ></input>
                    <button onClick={() => handleUpdateEmail()} className="bg-blue-700 text-white px-4 py-2 rounded-md">
                        Update
                    </button>
                </div>
            </div>
            {/* Api Key */}
            <div className="w-full flex flex-col px-[2rem] gap-[1rem] my-[1rem]">
                <div className="flex items-center gap-[0.5rem]">
                    <h3 className="">Your Api Key:</h3>
                    <div className="flex items-center gap-[0.5rem]">
                    <input
                        type="checkbox"
                        id="toggleApiKey"
                        checked={showApiKey}
                        onChange={handleToggleApiKey}
                    />
                    <label htmlFor="toggleApiKey">Show</label>
                    </div>
                </div>
                <div>
                    <p className="">{showApiKey ? user.apiKey : '*'.repeat(user.apiKey.length)}</p>
                </div>
            </div>
            <Toaster />
        </CardContent>
        </Card>
    );
};

export default UserProfile;