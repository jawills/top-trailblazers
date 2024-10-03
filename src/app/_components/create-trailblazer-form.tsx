"use client"

import * as React from "react"
import { trailblazers } from "~/server/db/schema"
import { type UseFormReturn } from "react-hook-form"

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select"
import { Textarea } from "~/components/ui/textarea"
import { type CreateTrailblazerSchema } from "~/app/_lib/validations"

interface CreateTrailblazerFormProps
  extends Omit<React.ComponentPropsWithRef<"form">, "onSubmit"> {
  children: React.ReactNode
  form: UseFormReturn<CreateTrailblazerSchema>
  onSubmit: (data: CreateTrailblazerSchema) => void
}

export function CreateTrailblazerForm({
  form,
  onSubmit,
  children,
}: CreateTrailblazerFormProps) {
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4"
      >
        <FormField
          control={form.control}
          name="profileUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Profile Url</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="https://www.salesforce.com/trailblazer/justinwills"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {children}
      </form>
    </Form>
  )
}