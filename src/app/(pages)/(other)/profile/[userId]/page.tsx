import type { Metadata } from "next";
import CenterMenu from "@/components/home/center/CenterMenu";
import LeftMenu from "@/components/home/left/LeftMenu";
import RightMenu from "@/components/home/right/RightMenu";

export const metadata: Metadata = {
  title: "SDSOCIAL | Profile",
  description: "Profile page",
};

const ProfilePage = ({ params }: { params: any }) => {
  return (
    <div className="w-full h-full flex gap-4">
      {/* LEFT */}
      <div className="hidden xl:block xl:w-[20%]">
        <LeftMenu type="profile" />
      </div>

      {/* CENTER */}
      <div className="w-full lg:w-[70%] xl:w-[50%]">
        <CenterMenu userId={params.userId} location="profile" />
      </div>

      {/* RIGHT */}
      <div className="hidden lg:block lg:w-[30%] xl:w-[30%]">
        <RightMenu userId={params.userId} />
      </div>
    </div>
  );
};

export default ProfilePage;
