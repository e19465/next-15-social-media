"use client";
import { useEffect, useState } from "react";
import MobileMenu from "./MobileMenu";
import Logo from "./Logo";
import NonMobileMenu from "./NonMobileMenu";
import Image from "next/image";
import { ClerkLoading, ClerkLoaded, SignedIn, UserButton } from "@clerk/nextjs";
import SearchComponent from "./SearchComponent";
import Spinner from "../Spinner";

const Navbar = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true); // Mark component as mounted on the client side
  }, []);

  return (
    <div
      className="flex w-full h-full items-center justify-between"
      suppressHydrationWarning
    >
      {/* LEFT => Logo */}
      <div className={`w-[40%] md:w-[20%] py-2`}>
        <Logo />
      </div>

      {/* CENTER */}
      <div className="hidden md:flex w-[60%] xl:w-[40%]">
        <NonMobileMenu />
      </div>

      {/* Search Component */}
      <div className="hidden xl:w-[20%] xl:flex items-center p-1">
        <SearchComponent />
      </div>

      {/* RIGHT */}
      <div className="w-[30%] md:w-[20%] flex items-center justify-end gap-4">
        {isMounted && (
          <>
            <ClerkLoading>
              <Spinner />
            </ClerkLoading>
            <div className="hidden md:flex md:gap-4 xl:gap-6 items-center">
              <ClerkLoaded>
                <SignedIn>
                  <div className="cursor-pointer">
                    <Image
                      src={"/people.png"}
                      alt="people"
                      width={20}
                      height={20}
                    />
                  </div>
                  <div className="cursor-pointer">
                    <Image
                      src={"/messages.png"}
                      alt="messages"
                      width={20}
                      height={20}
                    />
                  </div>
                  <div className="cursor-pointer">
                    <Image
                      src={"/notifications.png"}
                      alt="notifications"
                      width={20}
                      height={20}
                    />
                  </div>
                </SignedIn>
              </ClerkLoaded>
            </div>
            <div className="flex items-center justify-center">
              <ClerkLoaded>
                <SignedIn>
                  <UserButton />
                </SignedIn>
              </ClerkLoaded>
            </div>
          </>
        )}
        <MobileMenu />
      </div>
    </div>
  );
};

export default Navbar;
