import Ads from "./Ads";
import BirthDays from "./BirthDays";
import FriendRequests from "./FriendRequests";
import UserInformation from "./UserInformation";
import UserMedia from "./UserMedia";

const RightMenu = ({ userId }: { userId?: string }) => {
  return (
    <div className="w-full p-2 h-calc-100vh-minus-80 overflow-auto flex flex-col gap-6 scrollbar-hide">
      {userId && (
        <>
          <UserInformation userId={userId} />
          <UserMedia userId={userId} />
        </>
      )}
      <FriendRequests />
      <BirthDays />
      <Ads size="md" />
    </div>
  );
};

export default RightMenu;
