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
import { Textarea } from "@/components/ui/textarea"
import { useForm, FormProvider } from "react-hook-form"
import { useUpdateProductMutation } from "@/lib/api"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"


export function ProductUpdateDialog({ product, onUpdate }) {
  console.log("Component rendered with product:", product);

  const UpdateProductSchema = z.object({
    name: z.string().min(1, "Product name is required"),
    price: z.number().min(0, "Price must be a positive number"),
    description: z.string().min(1, "Description is required"),
    categoryID: z.string().min(1, "Category is required"),
    image: z.string().min(1, "Image URL is required"),
    stock: z.number().min(0, "Stock must be a positive number"),
  });

  const form = useForm({
    resolver: zodResolver(UpdateProductSchema),
    defaultValues: {
      name: product.name,
      description: product.description,
      price: Number(product.price),
      stock: Number(product.stock) || 0,
      image: product.image || "",
      categoryID: product.categoryID || "",
    },
    onError: (errors) => {
      console.log("Form validation errors:", errors);
    }
  });

  const [updateProduct, { isLoading }] = useUpdateProductMutation();

  const onSubmit = async (data) => {

    try {
      const formattedData = {
        ...data,
        price: Number(data.price),
        stock: Number(data.stock)
      };
      console.log(formattedData)
      await updateProduct({
        id: product._id,
        ...formattedData
      }).unwrap();
      
      toast.success("Product updated successfully");
      onUpdate?.();
    } catch (error) {
      toast.error("Failed to update product");
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default">Update Product</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]" onPointerDownOutside={(e) => e.preventDefault()}>
        <DialogHeader>
          <DialogTitle>Update Product</DialogTitle>
          <DialogDescription>
            Make changes to {product.name}
          </DialogDescription>
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
                      <Input placeholder="Product name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Product description"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Price</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          {...field}
                          onChange={(e) => field.onChange(Number(e.target.value))} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="stock"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Stock</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          {...field}
                          onChange={(e) => field.onChange(Number(e.target.value))} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Image URL</FormLabel>
                    <FormControl>
                      <Input placeholder="https://example.com/image.jpg" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex justify-end gap-4">
              <Button 
                type="submit" 
                disabled={isLoading}
              >
                {isLoading ? "Updating..." : "Update Product"}
              </Button>
            </div>
          </FormProvider>
        </form>
      </DialogContent>
    </Dialog>
  )
}

