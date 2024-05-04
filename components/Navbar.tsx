"use client";

import useCart from "@/lib/hooks/useCart";
import { UserButton, useUser } from "@clerk/nextjs";
import { CircleUserRound, Menu, ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const Navbar = () => {
  const { user } = useUser();
  const cart = useCart();
  //console.log(user);

  const [dropdownMenu, setdropdownMenu] = useState(false);

  return (
    <div className="sticky top-0 z-10 py-2 px-10 flex justify-between items-center bg-white">
      <Link href="/">
        <Image src="/logo.jpg" alt="logo" width={130} height={100} />
      </Link>
      <div className="flex gap-4 text-base-bold">
        <Link href="/" className="hover:text-red-1">
          Home
        </Link>
        <Link
          href={user ? "/wishlist" : "/sign-in"}
          className="hover:text-red-1"
        >
          Wishlist
        </Link>
        <Link
          href={user ? "/orders" : "/sign-in"}
          className="hover:text-red-1"
        >
          Orders
        </Link>
      </div>
      <div className="relative flex gap-3 items-center">
        <Link
          href="/cart"
          className="flex items-center gap-3 border rounded-lg px-2 py-1 hover:bg-black hover:text-white"
        >
          <ShoppingCart />
          <p className="text-base-bold">Cart ({cart.cartItems.length})</p>
        </Link>
        {user && (
          <Menu
            className="cursor-pointer"
            onClick={() => setdropdownMenu(!dropdownMenu)}
          />
        )}

        {user && dropdownMenu && (
          <div className="absolute top-10 right-5 flex flex-col gap-2 p-3 rounded-lg border bg-white text-base-bold">
            <Link href="/wishlist" className="hover:text-red-1">
              Wishlist
            </Link>
            <Link href="/orders" className="hover:text-red-1">
              Orders
            </Link>
          </div>
        )}

        {user ? (
          <UserButton afterSignOutUrl="/sign-in" />
        ) : (
          <Link href="/sign-in">
            <CircleUserRound />
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
