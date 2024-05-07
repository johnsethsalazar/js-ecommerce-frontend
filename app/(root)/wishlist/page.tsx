'use client'

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

  return (
    <div>Wishlist</div>
  )
}

export default Wishlist