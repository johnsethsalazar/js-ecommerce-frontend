import HeartFavorite from "./HeartFavorite";

const ProductInfo = ({ productInfo }: { productInfo: ProductType }) => {
  return (
    <div className="max-w-[400px] flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <p className="text-heading3-bold">{productInfo.title}</p>
        <HeartFavorite product={productInfo} />
      </div>

      <div className="flex gap-2">
        <p className="text-base-medium text-grey-2">Category:</p>
        <p className="text-base-bold ">{productInfo.category}</p>
      </div>

      <p className="text-heading3-bold">${productInfo.price}</p>

      <div className="flex flex-col gap-2">
        <p className="text-base-medium text-grey-2">Description</p>
        <p className="text-small-medium">{productInfo.description}</p>
      </div>

      {productInfo.colors.length > 0 && (
        <div className="flex flex-col gap-2">
          <p className="text-base-medium text-grey-2">Colors</p>
          <div className="flex gap-2">
            {productInfo.colors.map((color, index) => (
              <p
                key={index}
                className="border border-black px-2 py-1 rounded-lg cursor-pointer"
              >
                {color}
              </p>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductInfo;
