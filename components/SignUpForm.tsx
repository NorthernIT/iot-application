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
import { signUp } from "@/actions/auth.action"
import { toast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation"
import Link from "next/link"
 
export const SignUpSchema = z.object({
  username: z.string().min(2).max(50),
  email: z.string().email("Invalid email"),
  password: z.string().min(8, {message: "Password must be atleast 8 characters long"}),
})

export function SignUpForm() {
  const router = useRouter()

  // 1. Define your form.
  const form = useForm<z.infer<typeof SignUpSchema>>({
      resolver: zodResolver(SignUpSchema),
      defaultValues: {
      username: "",
      email: "",
      password: "",
      },
  })

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof SignUpSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    const res = await signUp(values)
    if(res.error) {
      toast({
        variant: "destructive",
        description: res.error,
      })
    } else if (res.success) {
      toast({
        variant: "default",
        description: "Account created successfully",
      })

      router.push("/")
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
        name="email"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Email</FormLabel>
            <FormControl>
              <Input placeholder="JohnDoe@gmail.com" type="email" {...field} />
            </FormControl>
            <FormDescription>
              This is your account email.
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
      <Button type="submit">Submit</Button>
      <div className="mt-4">
        <Link href="/sign-in" className="underline">
          Already have an account? Sign in
        </Link>
      </div>
    </form>
  </Form>
  )
}
