"use client";

import useCart from "@/lib/hooks/useCart";
import { UserButton, useUser } from "@clerk/nextjs";
import { CircleUserRound, Menu, Search, ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

interface ProductSatcProps {
  productMedia: string[];
  productInfo: ProductType;
  selectedColor: string;
  selectedSize: string;
  quantity: number;
}

const Satc = ({ productMedia, productInfo }: ProductSatcProps) => {
  const [mainImage, setMainImage] = useState(productMedia[0]);
  const router = useRouter();
  const cart = useCart();
  //console.log(user);

  const [query, setQuery] = useState("");
  const [selectedColor, setSelectedColor] = useState<string>(
    productInfo.colors[0]
  );
  const [selectedSize, setSelectedSize] = useState<string>(
    productInfo.sizes[0]
  );
  const [quantity, setQuantity] = useState<number>(1);

  return (
    <div className="sticky bottom-0 z-10 py-2 px-10 flex gap-2 justify-between items-center bg-white max-sm:px-2">
      <Link href="/">
        <Image
          src={mainImage}
          alt="product"
          width={500}
          height={500}
          className="w-24 h-24 rounded-lg shadow-lg object-cover"
        />
      </Link>
      <div className="flex gap-4 text-base-bold max-lg:hidden w-3/12	">
        <p className="text-heading3-bold text-left ">{productInfo.title}</p>
      </div>

      <p className="text-heading3">${productInfo.price}</p>

      <div className="flex gap-3 border border-grey-2 px-3 py-1 items-center rounded-lg">
      {productInfo.colors.length > 1 && (
        <div className="flex flex-col gap-2">
          <p className="text-base-medium text-grey-2">Colors</p>
          <div className="flex gap-2">
            {productInfo.colors.map((color, index) => (
              <p
                key={index}
                className={`border border-black px-2 py-1 rounded-lg cursor-pointer ${
                  selectedColor === color ? "bg-black text-white" : ""
                }`}
                onClick={() => setSelectedColor(color)}
              >
                {color}
              </p>
            ))}
          </div>
        </div>
      )}
      </div>

      <div className="relative flex gap-3 items-center">
          
        <button
              className="outline text-base-bold py-3 rounded-lg hover:bg-black hover:text-white"
              onClick={() =>
                cart.addItem({
                  item: productInfo,
                  quantity,
                  color: selectedColor,
                  size: selectedSize,
                })
              }
            >
              Add to Cart
            </button>
      </div>
    </div>
  );
};

export default Satc;