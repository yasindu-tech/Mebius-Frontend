import ProductCard from "./ProductCard"

function ProductCards(props) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
      {props.products.map((product) => {
        return (
          <ProductCard
            key={product._id}
            _id={product._id}
            name={product.name}
            price={product.price}
            image={product.image}
            description={product.description}
          />
        )
      })}
    </div>
  )
}

export default ProductCards
