import Ads from "../right/Ads";
import Menu from "./Menu";
import ProfileCard from "./ProfileCard";

const LeftMenu = ({ type }: { type: "home" | "profile" }) => {
  return (
    <div className="w-full scrollbar-hide p-2 h-calc-100vh-minus-80 overflow-auto flex flex-col gap-6">
      {type === "home" && <ProfileCard />}
      <Menu />
      <Ads size="sm" />
    </div>
  );
};

export default LeftMenu;
