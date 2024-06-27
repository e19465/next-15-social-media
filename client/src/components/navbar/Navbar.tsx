"use client";
import MobileMenu from "./MobileMenu";
import Logo from "./Logo";
import NonMobileMenu from "./NonMobileMenu";
import Link from "next/link";
import NO_AVATAR_IMAGE from "../../../../public/noAvatar.png";
import Image from "next/image";
import { ClerkLoaded } from "@clerk/nextjs";
import {
  ClerkLoading,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/clerk-react";
import SearchComponent from "./SearchComponent";

const Navbar = () => {
  return (
    <div className="flex w-full h-full items-center justify-between">
      {/* LEFT => Logo */}
      <div
        className={`w-[40%] md:w-[20%] xl:w-[20%] sm:block md:hidden lg:block`}
      >
        <Logo />
      </div>

      {/* CENTER */}
      <div className="hidden md:flex w-[50%] xl:w-[40%] pl-8">
        <NonMobileMenu />
      </div>

      {/* Search Component */}
      <div className="hidden xl:w-[20%] xl:flex items-center p-1">
        <SearchComponent />
      </div>

      {/* RIGHT */}
      <div className="w-[30%] xl:w-[20%] flex items-center justify-end gap-4">
        <div className="md:hidden">
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
        <MobileMenu />
        <ClerkLoading>
          <div
            className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
            role="status"
          >
            <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
              Loading...
            </span>
          </div>
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
                  alt="people"
                  width={20}
                  height={20}
                />
              </div>
              <div className="cursor-pointer">
                <Image
                  src={"/notifications.png"}
                  alt="people"
                  width={20}
                  height={20}
                />
              </div>
              <UserButton />
            </SignedIn>
          </ClerkLoaded>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
