"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useForm, FormProvider } from "react-hook-form"
import { useUpdateCategoryMutation } from "@/lib/api"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"

export function CategoryUpdateDialog({ category, onUpdate }) {
  const UpdateCategorySchema = z.object({
    name: z.string().min(1, "Category name is required"),
  })

  const form = useForm({
    resolver: zodResolver(UpdateCategorySchema),
    defaultValues: {
      name: category.name,
    },
  })

  const [updateCategory, { isLoading }] = useUpdateCategoryMutation()

  const onSubmit = async (data) => {
    try {
      await updateCategory({
        id: category._id,
        ...data,
      }).unwrap()

      toast.success("Category updated successfully")
      onUpdate?.()
    } catch (error) {
      toast.error("Failed to update category")
      console.error("Update error:", error)
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]" onPointerDownOutside={(e) => e.preventDefault()}>
        <DialogHeader>
          <DialogTitle>Update Category</DialogTitle>
          <DialogDescription>Make changes to the category name</DialogDescription>
        </DialogHeader>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormProvider {...form}>
            <div className="grid gap-4 py-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Category name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex justify-end gap-4">
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Updating..." : "Update Category"}
              </Button>
            </div>
          </FormProvider>
        </form>
      </DialogContent>
    </Dialog>
  )
}
