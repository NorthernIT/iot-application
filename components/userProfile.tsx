"use client";

import React, {useState} from "react";
import { Card, CardContent, CardHeader } from "./ui/card";
import { signOut } from "@/actions/auth.action";
import { Button } from "./ui/button";

const UserProfile = ({ user }: { user: any }) => {
    const [showApiKey, setShowApiKey] = useState(false);
    
    const handleToggleApiKey = () => {
        setShowApiKey(!showApiKey);
    };

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
        </CardContent>
        </Card>
    );
};

export default UserProfile;