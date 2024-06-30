"use client";
import { StaticImageData } from "next/image";
import Image from "next/image";

// image imports
import FRIENDS_IMAGE from "../../../public/friends.png";
import SETTINGS_IMAGE from "../../../public/settings.png";
import STORIES_IMAGE from "../../../public/stories.png";
import PROFILE_IMAGE from "../../../public/profile.png";
import { usePathname } from "next/navigation";
import { ProgressLink } from "../nprogress/NProgressHandler";

//! imports end >>>>>>>>>>>>>>>>>>>>>>>>>>>>> //

interface MenuItem {
  id: number;
  name: string;
  path: string;
  img: StaticImageData;
}

const NonMobileMenu = () => {
  const pathName = usePathname();
  const userId = "1";

  const menu: MenuItem[] = [
    {
      id: 1,
      name: "Stories",
      path: "/stories",
      img: STORIES_IMAGE,
    },
    {
      id: 2,
      name: "Friends",
      path: "/friends",
      img: FRIENDS_IMAGE,
    },
    {
      id: 3,
      name: "Settings",
      path: "/settings",
      img: SETTINGS_IMAGE,
    },
    {
      id: 4,
      name: "Profile",
      path: `/profile/${userId}`,
      img: PROFILE_IMAGE,
    },
  ];
  return (
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
  );
};

export default NonMobileMenu;
