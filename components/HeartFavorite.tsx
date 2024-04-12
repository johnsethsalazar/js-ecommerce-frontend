'use client'

import { useUser } from "@clerk/nextjs";
import { Heart } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const HeartFavorite = ({ product }: { product: ProductType }) => {
  const router = useRouter();
  const { user } = useUser();

  const [loading, setLoading] = useState(false);
  const [signedInUser, setSignedInUser] = useState<UserType | null>(null);
  const [isLiked, setIsLiked] = useState(false);
  const getUser = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/user");
      const data = await res.json();
      setSignedInUser(data);
      setIsLiked(data.wishlist.includes(product._id));
      setLoading(false);
    } catch (err) {
      console.log("[users_GET]", err);
    }
  };

  useEffect(() => {
    if (user) {
      getUser();
    }
  }, [user]);

  const handleLike = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    try {
      //If user clicked wishlist button and hasn't signed in yet. The user will be redirected to the sign-in page
      if (!user) {
        router.push("/sign-in");
        return;
      } else {
        setIsLiked((prevIsLiked) => !prevIsLiked);
        setLoading(true);
        const res = await fetch("/api/user/wishlist", {
          method: "POST",
          body: JSON.stringify({ productId: product._id }),
        });
        const updatedUser = await res.json();
        setSignedInUser(updatedUser.wishlist.includes(product._id));
        setLoading(false);
      }
    } catch (err) {
      console.log("[wishlist_POST]", err);
      setLoading(false);
    }
  };

  return (
    <button onClick={handleLike}>
      <Heart fill={`${isLiked ? "red" : "none"}`} />
    </button>
  );
};

export default HeartFavorite;
