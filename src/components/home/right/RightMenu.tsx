import { Suspense } from "react";
import Ads from "./Ads";
import BirthDays from "./BirthDays";
import FriendRequests from "./FriendRequests";
import UserInformation from "./UserInformation";
import UserMedia from "./UserMedia";
import Spinner from "@/components/Spinner";

const RightMenu = ({ userId }: { userId?: string }) => {
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
      <FriendRequests />
      <BirthDays />
      <Ads size="md" />
    </div>
  );
};

export default RightMenu;
