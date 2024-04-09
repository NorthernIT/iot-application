"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
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
import { signIn } from "@/actions/auth.action"
import { toast } from "@/components/ui/use-toast"
import { Toaster } from "./ui/toaster"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useRef } from "react"
 
export const SignInSchema = z.object({
  username: z.string().min(2).max(50),
  password: z.string().min(8, {message: "Password must be atleast 8 characters long"}),
})

export function SignInForm() {
  const router = useRouter()

  // 1. Define your form.
  const form = useForm<z.infer<typeof SignInSchema>>({
    resolver: zodResolver(SignInSchema),
    defaultValues: {
    username: "",
    password: "",
    },
  })

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof SignInSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    const res = await signIn(values)
    // console.log(res.status)
    if(res.status == 400) {
      // console.log("Made it!")
      toast({
        variant: "destructive",
        description: res.error,
      })
    } else if (res.status == 403){
      toast({
        variant: "default",
        title: "You have not verified your email!",
        description: res.error,
      })
    } else if (res.status == 200) {
      toast({
        variant: "default",
        description: "Signed in successfully",
      })

      router.push("/dashboard")
    }
  }
  return (
  <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
      <FormField
        control={form.control}
        name="username"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Username</FormLabel>
            <FormControl>
              <Input placeholder="JohnDoe123" {...field} />
            </FormControl>
            <FormDescription>
              This is your public display name.
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="password"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Password</FormLabel>
            <FormControl>
              <Input placeholder="********" type="password" {...field} />
            </FormControl>
            <FormDescription>
              This is your account password.
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
      <div className="text-right">
        <Link href="/auth/request-pass-reset" className="underline">
          Forgot Password?
        </Link>
      </div>
      <Button type="submit">Submit</Button>
      <div className="mt-4">
        <Link href="/auth/sign-up" className="underline">
          Do not have an account? Sign up
        </Link>
      </div>
    </form>
    <Toaster/>
  </Form>
  )
}