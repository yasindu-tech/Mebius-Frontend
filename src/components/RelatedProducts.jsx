import React from 'react'
import { useGetProductsQuery } from '@/lib/api'
import ProductCard from '@/pages/home/components/ProductCard'
const RelatedProducts = ({productId}) => {
    
  const { data: products = [] } = useGetProductsQuery()
   const currentProduct = products.find((product) => product._id === productId)
   console.log(currentProduct)
   const curentCategory = currentProduct.categoryID
   
   let relatedProducts = products.filter((product) => product.categoryID === curentCategory && product._id !== productId)

    if (relatedProducts.length === 0) {
        relatedProducts = products.filter((product) => product._id !== productId).slice(0, 4)
    }
  return (
    <section className="px-8 py-8">
    <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-emerald-600 to-emerald-800 bg-clip-text text-transparent">
      {relatedProducts.some((product) => {
        const currentProduct = products.find((p) => p._id === productId)
        return currentProduct && product.categoryID === currentProduct.categoryID
      })
        ? "Related Products"
        : "You May Also Like"}
    </h2>

    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
      {relatedProducts.map((product) => (
        <ProductCard
          key={product._id}
          _id={product._id}
          name={product.name}
          price={product.price}
          image={product.image}
          description={product.description}
        />
      ))}
    </div>
  </section>
  )
}

export default RelatedProducts
