import { useUser } from "@clerk/nextjs";
import { Heart } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const ProductInfo = ({ productInfo }: { productInfo: ProductType }) => {
  const ProductCard = ({ product }: { product: ProductType }) => {
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
        setIsLiked(data.wishlist.includes(productInfo._id));
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

    const handleLike = async () => {
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
            body: JSON.stringify({ productId: productInfo._id }),
          });
          const updatedUser = await res.json();
          setSignedInUser(updatedUser.wishlist.includes(productInfo._id));
          setLoading(false);
        }
      } catch (err) {
        console.log("[wishlist_POST]", err);
        setLoading(false);
      }
    };

    return (
      <div className="max-w-[400px] flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <p className="text-heading3-bold">{productInfo.title}</p>
          <button onClick={handleLike}>
            <Heart fill={`${isLiked ? "red" : "none"}`} />
          </button>
        </div>
      </div>
    );
  };
};

export default ProductInfo;
