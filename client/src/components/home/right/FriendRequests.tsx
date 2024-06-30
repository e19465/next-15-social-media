import { ProgressLink } from "@/components/nprogress/NProgressHandler";
import SingleFriendRequest from "./SingleFriendRequest";

const FriendRequests = () => {
  return (
    <div className="p-4 bg-white rounded-lg flex flex-col gap-4 justify-between text-sm shadow-md">
      {/* TOP */}
      <div className="flex items-center justify-between">
        <span className="font-medium text-gray-500">Friend Requests</span>
        <ProgressLink
          className="text-blue-500 hover:underline"
          href="/friend-requests"
        >
          See All
        </ProgressLink>
      </div>

      {/* BOTTOM */}
      <div className="flex flex-col items-center gap-4">
        <SingleFriendRequest />
        <SingleFriendRequest />
      </div>
    </div>
  );
};

export default FriendRequests;
