
import { useState } from "react"
import { useGetCategoriesQuery, useDeleteCategoryMutation } from "@/lib/api"
import { CategoryUpdateDialog } from "./components/CategoryUpdateDialog"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Trash2, Search, AlertCircle, Loader2 } from "lucide-react"
import { toast } from "sonner"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

const UpdateCategory = () => {
  const { data: categories = [], isLoading, isError, refetch } = useGetCategoriesQuery()
  const [deleteCategory, { isLoading: isDeleting }] = useDeleteCategoryMutation()
  const [searchTerm, setSearchTerm] = useState("")

  const handleDeleteCategory = async (id) => {
    try {
      await deleteCategory(id).unwrap()
      toast.success("Category deleted successfully")
      refetch()
    } catch (error) {
      toast.error("Failed to delete category")
      console.error("Delete error:", error)
    }
  }

  const filteredCategories = categories.filter(
    (category) =>
      // Exclude the "all" category and filter by search term
      category.name.toLowerCase() !== "all" && category.name.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  if (isError) {
    return (
      <div className="p-6 max-w-4xl mx-auto">
        <div className="bg-gray-100 border border-gray-300 rounded-lg p-6 text-center">
          <AlertCircle className="h-12 w-12 mx-auto mb-4 text-gray-500" />
          <h2 className="text-xl font-semibold mb-2">Error loading categories</h2>
          <p className="mb-4">Failed to fetch categories. Please try again.</p>
          <Button onClick={() => refetch()}>Retry</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Manage Categories</h1>

      <Card className="border border-gray-200 mb-8">
        <CardHeader className="pb-2">
          <CardTitle>Update Categories</CardTitle>
          <CardDescription>Edit or delete existing product categories</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Search categories..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCategories.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={3} className="text-center py-8 text-gray-500">
                    No categories found
                  </TableCell>
                </TableRow>
              ) : (
                filteredCategories.map((category) => (
                  <TableRow key={category._id}>
                    <TableCell className="font-mono text-sm text-gray-600">
                      {category._id.substring(category._id.length - 8)}
                    </TableCell>
                    <TableCell className="font-medium">{category.name}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <CategoryUpdateDialog category={category} onUpdate={refetch} />

                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button
                              variant="outline"
                              size="sm"
                              className="text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Delete Category</AlertDialogTitle>
                              <AlertDialogDescription>
                                Are you sure you want to delete the "{category.name}" category? This action cannot be
                                undone and may affect products assigned to this category.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => handleDeleteCategory(category._id)}
                                className="bg-gray-900 text-white hover:bg-gray-700"
                              >
                                {isDeleting ? "Deleting..." : "Delete"}
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

export default UpdateCategory
