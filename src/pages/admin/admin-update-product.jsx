import { useGetProductsQuery, useDeleteProductMutation } from "../../lib/api";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { ProductUpdateDialog } from "./components/product-update-dialog";
const UpdateProducts = () => {
  const {
    data: products = [],
    isLoading: isProductLoading,
    isError: isProductError,
    error: productsError,
    refetch: refetchProducts,
  } = useGetProductsQuery();

  const [deleteProduct, { isLoading: isLoadingDeleteProduct }] = useDeleteProductMutation();

  const handleDelete = async (id) => {
    try {
      await deleteProduct(id).unwrap();
      toast.success("Product deleted successfully");
      refetchProducts(); 
    } catch (error) {
      toast.error("Error deleting product");
    }
  };

  if (isProductLoading) {
    return <div className="text-center py-8">Loading products...</div>;
  }

  if (isProductError) {
    return <div className="text-center py-8 text-red-500">Error loading products: {productsError?.toString()}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Update Products</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <Card key={product._id} className="bg-white shadow-md">
            <CardHeader>
              <div className="flex items-center space-x-4">
                <div className="relative w-16 h-16 rounded-md overflow-hidden">
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
                <CardTitle className="text-xl font-semibold">{product.name}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-900 mb-2">{product.description}</p>
              <p className="font-bold mb-2">Price: ${product.price.toFixed(2)}</p>
              <p className="text-sm">Stock: {product.stock || "N/A"}</p>
            </CardContent>
            <CardFooter className="flex justify-between">
            <ProductUpdateDialog product={product} onUpdate={refetchProducts}/>
              <Button
                onClick={() => handleDelete(product._id)}
                variant="outline"
                className="border-gray-900 text-gray-800 hover:bg-gray-100"
                disabled={isLoadingDeleteProduct}
              >
                {isLoadingDeleteProduct ? "Deleting..." : "Delete"}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default UpdateProducts;

