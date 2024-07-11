import { Metadata } from "next";
import CenterMenu from "@/components/home/center/CenterMenu";
import LeftMenu from "@/components/home/left/LeftMenu";
import RightMenu from "@/components/home/right/RightMenu";

export const metadata: Metadata = {
  title: "SD | Social || Home",
  description: "Profile page",
};

const Homepage = () => {
  return (
    <div className="w-full h-full flex gap-4">
      {/* LEFT */}
      <div className="hidden xl:block xl:w-[20%]">
        <LeftMenu type="home" />
      </div>

      {/* CENTER */}
      <div className="w-full lg:w-[70%] xl:w-[50%]">
        <CenterMenu />
      </div>

      {/* RIGHT */}
      <div className="hidden lg:block lg:w-[30%] xl:w-[30%]">
        <RightMenu />
      </div>
    </div>
  );
};

export default Homepage;
