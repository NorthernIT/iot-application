"use client";
import React from "react";
import toast, { Toaster } from "react-hot-toast";
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useRouter, useSearchParams } from "next/navigation";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { resetPassword } from "@/actions/resetPassword";

const ValidationSchema = z.object({
    newPassword: z.string().min(8, {message: "Password must be atleast 8 characters long"}),
  }) 

const PasswordReset = () => {
    const searchParams = useSearchParams();
    const token = searchParams.get("token");
  
    const router = useRouter();

    // 1. Define your form.
  const form = useForm<z.infer<typeof ValidationSchema>>({
    resolver: zodResolver(ValidationSchema),
    defaultValues: {
        newPassword: "",
    },
  })
 
  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof ValidationSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
    const toastId = toast.loading("Resetting password...");

    if (!token) {
        toast.error(`No reset token found!`, { id: toastId });
        console.log("No Token");
        
        return;
    }

    const response = await resetPassword(token, values.newPassword);

    if (!response) {
        toast.error(`Internal server error.`, { id: toastId });
    }

    if (response.status !== 200) {
        console.log(token)
        toast.error(`${response.message}`, { id: toastId });
    }
    if (response.status === 200) {
        toast.success(`${response.message}`, { id: toastId });
        router.push("/auth/sign-in");
        router.refresh();
    }
  }
  
    return (
    <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="newPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>New Password</FormLabel>
                <FormControl>
                  <Input placeholder="********" type="password" {...field} />
                </FormControl>
                <FormDescription>
                  This is will be your new new Password.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
        <Toaster/>
    </Form>
    );
  };
  
  export default PasswordReset;