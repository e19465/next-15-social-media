import { StaticImageData } from "next/image";
import Image from "next/image";
import Link from "next/link";

// image imports
import HOME_IMAGE from "../../../public/home.png";
import FRIENDS_IMAGE from "../../../public/friends.png";
import SETTINGS_IMAGE from "../../../public/settings.png";
import STORIES_IMAGE from "../../../public/stories.png";

//! imports end >>>>>>>>>>>>>>>>>>>>>>>>>>>>> //

interface MenuItem {
  id: number;
  name: string;
  path: string;
  img: StaticImageData;
}

const menu: MenuItem[] = [
  {
    id: 1,
    name: "Home",
    path: "/",
    img: HOME_IMAGE,
  },
  {
    id: 2,
    name: "Stories",
    path: "/stories",
    img: STORIES_IMAGE,
  },
  {
    id: 3,
    name: "Friends",
    path: "/friends",
    img: FRIENDS_IMAGE,
  },
  {
    id: 4,
    name: "Settings",
    path: "/settings",
    img: SETTINGS_IMAGE,
  },
];

const NonMobileMenu = () => {
  return (
    <div className="flex gap-6 lg:gap-8">
      {menu.map((item) => (
        <Link key={item.id} href={item.path} className="flex gap-2">
          <Image
            src={item.img}
            width={16}
            height={16}
            alt="icon image"
            priority
            className="w-4 h-auto object-contain"
          />
          <span>{item.name}</span>
        </Link>
      ))}
    </div>
  );
};

export default NonMobileMenu;
