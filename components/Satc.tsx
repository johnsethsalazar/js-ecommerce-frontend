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
}

const Satc = ({ productMedia, productInfo }: ProductSatcProps) => {
  const [mainImage, setMainImage] = useState(productMedia[0]);
  const router = useRouter();
  const { user } = useUser();
  const cart = useCart();
  //console.log(user);

  const [dropdownMenu, setdropdownMenu] = useState(false);
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
        <input
          className="outline-none max-sm:max-w-[120px]"
          placeholder="Search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button
          disabled={query === ""}
          onClick={() => router.push(`/search/${query}`)}
        >
          <Search className="cursor-pointer h-4 w-4 hover:text-red-1" />
        </button>
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
