"use client";
import Link from "next/link";
import { useState, useEffect } from "react";

interface MenuItem {
  id: number;
  name: string;
  path: string;
}

const mobileMenu: MenuItem[] = [
  {
    id: 1,
    name: "Home",
    path: "/",
  },
  {
    id: 2,
    name: "Stories",
    path: "/stories",
  },
  {
    id: 3,
    name: "Profile",
    path: "/profile",
  },
  {
    id: 4,
    name: "Friends",
    path: "/friends",
  },
  {
    id: 5,
    name: "Settings",
    path: "/settings",
  },
];

const MobileMenu = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      const burgerButton = document.getElementById("burger-button");
      if (burgerButton && !burgerButton.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("click", handleOutsideClick);
    } else {
      document.removeEventListener("click", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [isOpen]);

  return (
    <div>
      <div
        id="burger-button"
        className="flex flex-col gap-1 cursor-pointer md:hidden"
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen((prev) => !prev);
        }}
      >
        <div
          className={`w-6 h-1 bg-blue-500 rounded-sm transition-transform duration-300 ease-in-out ${
            isOpen ? "rotate-45 translate-y-2" : ""
          }`}
        />
        <div
          className={`w-6 h-1 bg-blue-500 rounded-sm transition-opacity duration-300 ease-in-out ${
            isOpen ? "opacity-0" : ""
          }`}
        />
        <div
          className={`w-6 h-1 bg-blue-500 rounded-sm transition-transform duration-300 ease-in-out ${
            isOpen ? "-rotate-45 -translate-y-2" : ""
          }`}
        />
      </div>
      <div
        className={`flex flex-col items-center justify-center fixed top-[80px] right-0 w-full sm:w-1/2 h-calc-100vh-minus-80 bg-white z-[1000] transition-transform duration-300 ease-in-out ${
          isOpen ? "transform translate-x-0" : "transform translate-x-full"
        }`}
      >
        {mobileMenu.map((item) => (
          <Link
            key={item.id}
            href={item.path}
            className="no-underline text-lg text-blue-500 w-full flex items-center justify-center py-2 mb-1"
            onClick={() => setIsOpen(false)}
          >
            {item.name}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MobileMenu;
