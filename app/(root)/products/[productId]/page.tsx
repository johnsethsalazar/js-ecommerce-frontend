import { getProductDetails } from '@/lib/actions'

const ProductDetails = async ({params}: {params: {productId: string}}) => {
  const productDetails = await getProductDetails(params.productId)
  console.log(productDetails)
  return (
    <div>ProductDetails</div>
  )
}

export default ProductDetails