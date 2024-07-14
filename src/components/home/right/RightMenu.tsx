import { Suspense } from "react";
import Ads from "./ads/Ads";
import BirthDays from "./birthdays/BirthDays";
import FriendRequests from "./friend_requests/FriendRequests";
import UserInformation from "./user_information_card/UserInformation";
import UserMedia from "./user_media_card/UserMedia";
import Spinner from "@/components/Spinner";

const RightMenu = ({
  userId,
  location,
}: {
  userId?: string;
  location?: string;
}) => {
  return (
    <div className="w-full p-2 h-calc-100vh-minus-80 overflow-auto flex flex-col gap-6 scrollbar-hide">
      {userId && (
        <>
          <Suspense fallback={<Spinner />}>
            <UserInformation userId={userId} />
          </Suspense>
          <Suspense fallback={<Spinner />}>
            <UserMedia userId={userId} />
          </Suspense>
        </>
      )}
      {location === "home" && <FriendRequests />}
      <BirthDays />
      <Ads size="md" />
    </div>
  );
};

export default RightMenu;
