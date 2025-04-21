
import { useGetCategoriesQuery, useGetProductsQuery } from "@/lib/api"
import { useState, useEffect } from "react"
import { Skeleton } from "@/components/ui/skeleton"
import ProductCards from "./home/components/ProductCards"
import Sort from "@/components/Sort"
import Tab from "./home/components/Tab"
import { ShoppingBag, Filter, AlertCircle, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

function ShopPage() {
  const [selectedCategoryId, setSelectedCategoryId] = useState("6799dcee10aedfd1dd9d6b70")
  const [sortOption, setSortOption] = useState("ascending")
  const [filteredProducts, setFilteredProducts] = useState([])
  const [searchQuery, setSearchQuery] = useState("")
  const [showFilters, setShowFilters] = useState(false)
  const [priceRange, setPriceRange] = useState("all")

  const {
    data: products = [],
    isLoading: isProductLoading,
    isError: isProductError,
    error: productsError,
  } = useGetProductsQuery()

  const {
    data: categories = [],
    isLoading: isCategoryLoading,
    isError: isCategoryError,
    error: categoryError,
  } = useGetCategoriesQuery()

  useEffect(() => {
    let updatedProducts = [...products]

    // Filter by category
    if (selectedCategoryId !== "6799dcee10aedfd1dd9d6b70") {
      updatedProducts = updatedProducts.filter((prod) => prod.categoryID === selectedCategoryId)
    }

    // Filter by search query (name only)
    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase()
      updatedProducts = updatedProducts.filter((prod) =>
        prod.name.toLowerCase().includes(query)
      )
    }

    // Sort by price
    if (sortOption === "ascending") {
      updatedProducts.sort((a, b) => Number.parseFloat(a.price) - Number.parseFloat(b.price))
    } else {
      updatedProducts.sort((a, b) => Number.parseFloat(b.price) - Number.parseFloat(a.price))
    }

    setFilteredProducts(updatedProducts)
  }, [selectedCategoryId, sortOption, products, searchQuery, priceRange])

  const handleTabClick = (categoryId) => {
    setSelectedCategoryId(categoryId)
  }

  const sortProducts = (sortOption) => {
    setSortOption(sortOption)
  }

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value)
  }

  const handlePriceRangeChange = (value) => {
    setPriceRange(value)
  }

  const toggleFilters = () => {
    setShowFilters(!showFilters)
  }

  const getCategoryName = (id) => {
    if (id === "6799dcee10aedfd1dd9d6b70") return "All Products"
    const category = categories.find((cat) => cat._id === id)
    return category ? category.name : "Products"
  }

  if (isProductLoading || isCategoryLoading) {
    return (
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-8 mb-6">
          <div className="flex items-center gap-2 mb-2">
            <ShoppingBag className="h-6 w-6 text-emerald-600" />
            <Skeleton className="h-10 w-64" />
          </div>
          <Skeleton className="h-6 w-full max-w-2xl mb-6" />

          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <Skeleton className="h-10 flex-grow" />
            <Skeleton className="h-10 w-40" />
          </div>

          <div className="flex gap-2 overflow-x-auto pb-2 mb-8">
            {[...Array(5)].map((_, i) => (
              <Skeleton key={i} className="h-10 w-24 flex-shrink-0" />
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="space-y-4">
                <Skeleton className="h-64 w-full rounded-lg" />
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-10 w-full" />
              </div>
            ))}
          </div>
        </div>
      </main>
    )
  }

  if (isProductError || isCategoryError) {
    return (
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center gap-2 mb-6">
          <ShoppingBag className="h-6 w-6 text-emerald-600" />
          <h1 className="text-3xl font-bold">Shop Our Collection</h1>
        </div>

        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-red-700 mb-2">Oops! Something went wrong</h2>
          <p className="text-red-600 mb-4">
            {productsError?.message || categoryError?.message || "Failed to load products"}
          </p>
          <Button onClick={() => window.location.reload()} className="bg-emerald-600 hover:bg-emerald-700">
            Try Again
          </Button>
        </div>
      </main>
    )
  }

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="py-8 mb-6">
        <div className="flex items-center gap-2 mb-2">
          <ShoppingBag className="h-6 w-6 text-emerald-600" />
          <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-emerald-800 bg-clip-text text-transparent">
            {getCategoryName(selectedCategoryId)}
          </h1>
        </div>
        <p className="text-gray-600 max-w-2xl mb-6">
          Discover our curated collection of premium products designed to enhance your lifestyle. Browse by category or
          use the search to find exactly what you're looking for.
        </p>

        {/* Search and Sort */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-grow">
            <Input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="pl-10 border-emerald-200 focus-visible:ring-emerald-500"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          </div>
          <div className="flex gap-2">
            <Sort sortOption={sortOption} onSortOptionChange={sortProducts} />
          </div>
        </div>

        {/* Filters */}
        {showFilters && (
          <div className="bg-gray-50 p-4 rounded-lg mb-6 border border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Price Range</label>
                <Select value={priceRange} onValueChange={handlePriceRangeChange}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select price range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Prices</SelectItem>
                    <SelectItem value="under50">Under $50</SelectItem>
                    <SelectItem value="50to100">$50 - $100</SelectItem>
                    <SelectItem value="over100">Over $100</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        )}

        {/* Category Tabs */}
        <div className="flex items-center gap-4 overflow-x-auto pb-2 mb-6">
          {categories.map((category) => (
            <Tab
              key={category._id}
              name={category.name}
              _id={category._id}
              selectedCategoryId={selectedCategoryId}
              onTabClick={handleTabClick}
            />
          ))}
        </div>

        {/* Results Count */}
        <div className="flex justify-between items-center mb-6">
          <p className="text-gray-600">
            Showing <span className="font-medium">{filteredProducts.length}</span> products
          </p>
        </div>

        {/* Products */}
        {filteredProducts.length > 0 ? (
          <ProductCards products={filteredProducts} />
        ) : (
          <div className="text-center py-16 bg-gray-50 rounded-lg border border-gray-200">
            <ShoppingBag className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-1">No products found</h3>
            <p className="text-gray-500 mb-6">Try adjusting your search or filter criteria</p>
            <Button
              onClick={() => {
                setSelectedCategoryId("6799dcee10aedfd1dd9d6b70")
                setSearchQuery("")
                setPriceRange("all")
              }}
              className="bg-emerald-600 hover:bg-emerald-700"
            >
              Reset Filters
            </Button>
          </div>
        )}
      </div>
    </main>
  )
}

export default ShopPage
