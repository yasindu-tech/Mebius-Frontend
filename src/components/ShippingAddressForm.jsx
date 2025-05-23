import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { useNavigate } from "react-router";
import { useCreateOrderMutation } from "@/lib/api";
import { toast } from "sonner";
import { useUpdateProductMutation, useGetProductQuery } from "@/lib/api";

const formSchema = z.object({
  line_1: z.string().min(1),
  line_2: z.string().min(1),
  city: z.string().min(1),
  state: z.string().min(1),
  zip_code: z.string().min(1),
  phone: z.string().refine(
    (value) => {
      // This regex checks for a basic international phone number format
      return /^\+?[1-9]\d{1,14}$/.test(value);
    },
    {
      message: "Invalid phone number format",
    }
  ),
});

const ShippingAddressForm = ({ cart }) => {
  const form = useForm({
    resolver: zodResolver(formSchema),
  });

  const [createOrder, { isLoading, isError, data }] = useCreateOrderMutation();
  const [updateProduct] = useUpdateProductMutation();
  const navigate = useNavigate();

  const productQueries = cart.map((item) => useGetProductQuery(item.product._id));

  async function handleSubmit(values) {
    try {
      // Ensure all products have their stock updated
      await Promise.all(
        productQueries.map(async ({ data: product }, index) => {
          if (!product) throw new Error(`Product ${cart[index].product._id} not found`);

          const newStock = product.stock - cart[index].quantity;

          await updateProduct({ id: cart[index].product._id, stock: newStock }).unwrap();
        })
      );

      console.log("Items in cart:", cart);
      console.log("Shipping address values:", values);

      cart.forEach((item) => {
        console.log("Item in cart:", item);
        console.log("stripePriceId:", item.product.stripePriceId);
      });
      // Add stripePriceId to each item in the cart
      const itemsWithStripePriceId = cart.map((item) => ({
      
        ...item,
        product: {
          ...item.product,
          stripePriceId: item.product.stripePriceId, 
        },

      }));

      // Create the order
      const createdOrder = await createOrder({
        items: itemsWithStripePriceId,
        shippingAddress: values,
      }).unwrap();

      const orderId = createdOrder._id;

      toast.success("Checkout successful");
      navigate(`/shop/payment?orderId=${orderId}`);
    } catch (error) {
      toast.error(error.message || "Error processing checkout");
      console.error("Checkout error:", error);
    }
  }

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <div className="grid grid-cols-2 gap-y-2 gap-x-4">
            <FormField
              control={form.control}
              name="line_1"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Line 1</FormLabel>
                  <FormControl>
                    <Input placeholder="16/1" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="line_2"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Line 1</FormLabel>
                  <FormControl>
                    <Input placeholder="Main St" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>City</FormLabel>
                  <FormControl>
                    <Input placeholder="Kadawatha" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="state"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>State/Province</FormLabel>
                  <FormControl>
                    <Input placeholder="Wester Province" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="zip_code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Zip Code</FormLabel>
                  <FormControl>
                    <Input placeholder="11850" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input placeholder="+94702700100" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="mt-4">
            <Button type="submit">Proceed to Payment</Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ShippingAddressForm;
