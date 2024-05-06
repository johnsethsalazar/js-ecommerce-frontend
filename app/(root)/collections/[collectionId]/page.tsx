import ProductCard from "@/components/ProductCard";
import { getCollectionDetails } from "@/lib/actions/actions";
import Image from "next/image";
import React from "react";

const CollectionDetails = async ({
  params,
}: {
  params: { collectionId: string };
}) => {
  const collectionDetails = await getCollectionDetails(params.collectionId);
  console.log(collectionDetails);
  return (
    <div className="px-10 py-5 flex flex-col items-center gap-8">
      <Image
        src={collectionDetails.image}
        alt="collection"
        width={1500}
        height={1000}
        className="w-full h-[400px] object-cover rounded-xl"
      />
      <p className="text-heading3-bold text-grey-2">
        {collectionDetails.title}
      </p>
      <p className="text-body-normal text-center max-w-[900px]">
        {collectionDetails.description}
      </p>
      {collectionDetails.products.length > 0 ? (
        <div className="flex flex-wrap gap-16 mx-auto">
          {collectionDetails.products.map((product: ProductType) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      ) : (
        <p className="text-heading3-bold text-grey-2">
          No products found for {collectionDetails.title} collection
        </p>
      )}
    </div>
  );
};

export default CollectionDetails;

export const dynamic = "force-dynamic";
