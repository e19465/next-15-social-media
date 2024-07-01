"use client";
import Image, { StaticImageData } from "next/image";
import { ProgressLink } from "@/components/nprogress/NProgressHandler";
import { usePathname } from "next/navigation";

// Image imports
import MY_POSTS from "../../../../public/posts.png";
import ACTIVITY from "../../../../public/activity.png";
import EVENTS from "../../../../public/events.png";
import MARKET_PLACE from "../../../../public/market.png";
import ALBUMS from "../../../../public/albums.png";
import VIDEOS from "../../../../public/videos.png";
import NEWS from "../../../../public/news.png";
import COURSES from "../../../../public/courses.png";
import LISTS from "../../../../public/lists.png";

interface MenuItem {
  id: number;
  name: string;
  path: string;
  img: StaticImageData;
}

const Menu = () => {
  const pathName = usePathname();

  const menu: MenuItem[] = [
    {
      id: 1,
      name: "My Posts",
      path: "/my-posts",
      img: MY_POSTS,
    },
    {
      id: 2,
      name: "Activity",
      path: "/activity",
      img: ACTIVITY,
    },
    {
      id: 3,
      name: "Events",
      path: "/events",
      img: EVENTS,
    },
    {
      id: 4,
      name: "Marketplace",
      path: `/market`,
      img: MARKET_PLACE,
    },
    {
      id: 5,
      name: "Albums",
      path: `/albums`,
      img: ALBUMS,
    },
    {
      id: 6,
      name: "Videos",
      path: `/videos`,
      img: VIDEOS,
    },
    {
      id: 7,
      name: "News",
      path: `/news`,
      img: NEWS,
    },
    {
      id: 8,
      name: "Courses",
      path: `/courses`,
      img: COURSES,
    },
    {
      id: 9,
      name: "Lists",
      path: `/lists`,
      img: LISTS,
    },
  ];

  return (
    <div className="p-4 bg-white rounded-lg flex flex-col gap-4 justify-between text-sm shadow-md">
      <div className="flex flex-col gap-5">
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
              <div className="w-[20%] h-[2px] rounded-lg bg-img-gradient-blue-purple" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Menu;
