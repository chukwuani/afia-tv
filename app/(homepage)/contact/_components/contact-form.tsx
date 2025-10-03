"use client"

import { useState } from "react"
import Link from "next/link"

import { zodResolver } from "@hookform/resolvers/zod"
import axios, { AxiosError } from "axios"
import * as z from "zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

import { cn, unknownError } from "@/lib/utils"


const contactSalesSchema = z.object({
  firstName: z
    .string()
    .min(1, { message: "Must be 1 or more characters long" }),
  lastName: z.string().min(1, { message: "Must be 1 or more characters long" }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  topic: z.string().min(5, { message: "Must be 5 or more characters long" }),
  message: z
    .string()
    .min(10, { message: "Must be 10 or more characters long" }),
})

type ContactSalesSchema = z.infer<typeof contactSalesSchema>

const ContactForm = () => {
  const [loading, setLoading] = useState(false)

  const {
    register,
    setValue,
    handleSubmit,
    reset,
    formState: { errors },
    clearErrors,
  } = useForm<ContactSalesSchema>({
    resolver: zodResolver(contactSalesSchema),
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      topic: "",
      message: "",
    },
  })

  const onSubmit = async (data: ContactSalesSchema) => {
    setLoading(true)
    try {
      const mutations = {
        mutations: [
          {
            create: {
              _type: "contactSales",
              status: "new",
              firstName: data.firstName,
              lastName: data.lastName,
              email: data.email,
              topic: data.topic,
              message: data.message,
            },
          },
        ],
      }

      const res = await axios.post(
        `https://${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}.api.sanity.io/v2021-06-07/data/mutate/${process.env.NEXT_PUBLIC_SANITY_DATASET}`,
        mutations,
        {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_SANITY_API_TOKEN}`,
            "Content-Type": "application/json",
          },
        }
      )

      toast.success("Thanks for Reaching Out!", {
        description:
          "We've received your message and the sales team will get back to you shortly. We appreciate your interest!",
      })

      reset()
    } catch (err) {
      if (err instanceof AxiosError) {
        switch (err.status) {
          case 400:
            toast.error("Error", { description: "Invalid input." })
            break
          default:
            toast.error("Oops, Something Went Wrong", {
              description: unknownError,
            })
        }
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-background border border-border rounded-3xl p-8">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <Input
            {...register("firstName", { required: true })}
            onChange={(e) => {
              setValue("firstName", e.target.value)
              clearErrors("firstName")
            }}
            placeholder="First name"
            className={cn(
              "flex-1 font-san bg-accent h-11 border-0",
              errors.firstName && "ring-2 !ring-destructive ring-offset-2"
            )}
            required
          />
          <Input
            {...register("lastName", { required: true })}
            onChange={(e) => {
              setValue("lastName", e.target.value)
              clearErrors("lastName")
            }}
            className={cn(
              "flex-1 font-san bg-accent h-11 border-0",
              errors.lastName && "ring-2 !ring-destructive ring-offset-2"
            )}
            placeholder="Last name"
            required
          />
        </div>
        <Input
          {...register("email")}
          onChange={(e) => {
            setValue("email", e.target.value)
            clearErrors("email")
          }}
          type="email"
          placeholder="Email"
          className={cn(
            "flex-1 font-san bg-accent h-11 border-0",
            errors.email && "ring-2 !ring-destructive ring-offset-2"
          )}
          required
        />
        <Input
          {...register("topic", { required: true })}
          onChange={() => clearErrors("topic")}
          placeholder="Topic"
          className={cn(
            "flex-1 font-san bg-accent h-11 border-0",
            errors.topic && "ring-2 !ring-destructive ring-offset-2"
          )}
          required
        />
        <Textarea
          {...register("message")}
          onChange={() => clearErrors("message")}
          className={cn(
            "flex-1 font-san min-h-[150px] bg-accent h-11 border-0 text-base",
            errors.message && "ring-2 !ring-destructive ring-offset-2"
          )}
          placeholder="Message"
        />
        <Button className="w-32 rounded-full" type="submit" disabled={loading}>
          {loading ? "Submitting..." : "Submit"}
        </Button>
        <p className="text-sm text-muted-foreground font-light">
          By pressing submit you agree to the Sinphox{" "}
          <Link href="/terms" className="underline">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link href="/privacy" className="underline">
            Privacy Policy
          </Link>
          .
        </p>
      </form>
    </div>
  )
}

export default ContactForm
