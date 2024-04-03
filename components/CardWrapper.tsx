"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "./ui/button";
import Link from "next/link";
import Image from "next/image";

interface CardWrapperProps {
    children: React.ReactNode;
    headerLabel: string;
    backButtonLabel: string;
    backButtonHref: string;
    showSocial?: boolean;
}

const CardWrapper = ({
    children,
    headerLabel,
    backButtonLabel,
    backButtonHref,
}: CardWrapperProps) => {
    return (
        <Card className="w-full min-w-[22rem] md:w-[30rem] h-fit shadow-md pt-[2rem] md:pt-[3rem]">
        <Image
            width={100}
            height={100}
            src={"/nits.png"}
            alt="Northern IT Solutions Logo" 
            className="mx-auto"
        />
        <CardHeader>
            <div className="w-full flex gap-y-4 text-center items-center justify-center py-[1rem]">
            <h1 className={"text-3xl font-semibold"}>{headerLabel}</h1>
            {/* <p className="text-muted-foreground text-sm">
            {headerLabel}
        </p> */}
            </div>
        </CardHeader>
        <CardContent>{children}</CardContent>
        <CardFooter>
            <Button variant="link" className="font-normal w-full" size="sm" asChild>
            <Link href={backButtonHref}>{backButtonLabel}</Link>
            </Button>
        </CardFooter>
        </Card>
    );
};

export default CardWrapper;