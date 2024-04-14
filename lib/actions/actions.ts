export const getCollections = async () => {
  const collections = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/collections`);
  return await collections.json();
}

export const getProducts = async () => {
  const products = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`);
  return await products.json();
}

export const getProductDetails = async (id: string) => {
  const product = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/${id}`);
  return await product.json();
}