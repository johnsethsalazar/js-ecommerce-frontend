'use client'

import Loader from "@/components/Loader";
import ProductCard from "@/components/ProductCard";
import { getProductDetails } from "@/lib/actions/actions";
import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";

const Wishlist = () => {
  const { user } = useUser();
  const [loading, setLoading] = useState(true);
  const [signedInUser, setSignedInUser] = useState<UserType | null>(null);
  const [wishlist, setWishlist] = useState<ProductType[]>([]);

  const getUser = async () => {
    try {
      const res = await fetch("/api/user");
      const data = await res.json();
      setSignedInUser(data);
      setLoading(false);
    } catch(err) {
      console.log("[users_GET]", err);
    }
  }

  useEffect(() => {
    if(user) {
      getUser();
    }
  }, [user]);

  console.log(signedInUser);

  const getWishlistProducts = async () => {
    setLoading(true);

    if(!signedInUser) return

    const wishlistProducts = await Promise.all(signedInUser.wishlist.map(async (productId) => {
      const res = await getProductDetails(productId);
      return res;
    }))

    setWishlist(wishlistProducts);
  }

  useEffect(() => {
    if(signedInUser){
      getWishlistProducts();
    }
  }, [signedInUser]);

  return loading ? <Loader /> : (
    <div className="px-10 py-5">
      <p className="text-heading3-bold my-10">Your Wishlist</p>
      {wishlist.length === 0 && (
        <p className="text-heading3-bold">Your wishlist is empty</p>
      )}
      <div className="flex flex-wrap justify-center gap-16">
        {wishlist.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  )
}

export default Wishlist