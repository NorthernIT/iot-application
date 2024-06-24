"use client";

import { useRouter } from "next/navigation";
import { sendPasswordReset } from "@/actions/sendPasswordReset";
import { generatePasswordResetToken } from "@/actions/generatePasswordReset";
import toast, { Toaster } from "react-hot-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link"

const resetPassSchema = z.object({
    email: z.string().email("Invalid Email"),
})

export function ResetPassForm() {
    // 1. Define your form.
  const form = useForm<z.infer<typeof resetPassSchema>>({
    resolver: zodResolver(resetPassSchema),
    defaultValues: {
      email: "",
    },
  })
  
  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof resetPassSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    const toastId = toast.loading("Sending...");

    // Generate token
    const token = await generatePasswordResetToken(values.email);

    if (token) {
        // Send reset
        const response = await sendPasswordReset(values.email, token);

        if (!response) {
        toast.error(`Internal server error.`, { id: toastId });
        }

        
        // 400 = user error 500 = server error

        if (response.status !== 200) {
        toast.error(`${response.message}`, { id: toastId });
        }

        if (response.status === 200) {
        toast.success(`${response.message}`, { id: toastId });
        }
    }
    else {
        // User doesnt exist
        toast.error(`Email has no associated account!`, { id: toastId });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="johndoe@mail.com" type="email" {...field} />
              </FormControl>
              <FormDescription>
                Please enter your account email.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
        <div>
            <Link href="/auth/sign-in" className="underline">
                Cancel
            </Link>
        </div>
      </form>
      <Toaster/>
    </Form>
  )
}
