"use client"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useCreateCategoryMutation } from "@/lib/api"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { PlusCircle } from "lucide-react"

const AddCategory = () => {
  const [createCategory, { isLoading }] = useCreateCategoryMutation()

  const formSchema = z.object({
    name: z
      .string()
      .min(2, {
        message: "Category name must be at least 2 characters.",
      })
      .max(50, {
        message: "Category name must not exceed 50 characters.",
      }),
  })

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  })

  const onSubmit = async (data) => {
    try {
      await createCategory(data).unwrap()
      toast.success("Category added successfully")
      form.reset()
    } catch (error) {
      toast.error("Failed to add category")
      console.error("Create error:", error)
    }
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Add New Category</h1>

      <Card className="border border-gray-200">
        <CardHeader>
          <CardTitle>Create Category</CardTitle>
          <CardDescription>Add a new product category to your store</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter category name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" disabled={isLoading} className="bg-gray-900 text-white hover:bg-gray-800">
                <PlusCircle className="h-4 w-4 mr-2" />
                {isLoading ? "Adding..." : "Add Category"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}

export default AddCategory
