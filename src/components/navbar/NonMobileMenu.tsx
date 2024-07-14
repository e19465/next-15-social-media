"use client";
import { StaticImageData } from "next/image";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ProgressLink } from "../nprogress/NProgressHandler";
import Spinner from "../Spinner";
import { useAuth } from "@clerk/nextjs";

// image imports
import FRIENDS_IMAGE from "../../../public/friends.png";
import SETTINGS_IMAGE from "../../../public/settings.png";
import FOLLOWING_IMAGE from "../../../public/groups.png";
import PROFILE_IMAGE from "../../../public/profile.png";

//! imports end >>>>>>>>>>>>>>>>>>>>>>>>>>>>> //

interface MenuItem {
  id: number;
  name: string;
  path: string;
  img: StaticImageData;
}

const NonMobileMenu = () => {
  const pathName = usePathname();
  const { userId } = useAuth();

  const menu: MenuItem[] = [
    {
      id: 1,
      name: "Following",
      path: "/following",
      img: FOLLOWING_IMAGE,
    },
    {
      id: 2,
      name: "Followers",
      path: "/followers",
      img: FRIENDS_IMAGE,
    },
    {
      id: 3,
      name: "Profile",
      path: `/profile/${userId}`,
      img: PROFILE_IMAGE,
    },
  ];
  return (
    <>
      {!userId ? (
        <Spinner />
      ) : (
        <div className="flex gap-6 lg:gap-8">
          {menu.map((item) => (
            <div className="flex flex-col gap-1" key={item.id}>
              <ProgressLink
                href={item.path}
                className={`flex gap-2 
            ${
              pathName === item.path
                ? "blue-gradient_text font-medium"
                : "text-gray-500"
            } 
              ${pathName !== item.path && "hover:underline"}
              
              `}
              >
                <Image
                  src={item.img}
                  width={16}
                  height={16}
                  alt="icon image"
                  priority
                  className="w-4 h-auto object-contain"
                />
                <span>{item.name}</span>
              </ProgressLink>
              {pathName === item.path && (
                <div className="w-[50%] h-[2px] rounded-lg bg-img-gradient-blue-purple" />
              )}
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default NonMobileMenu;
