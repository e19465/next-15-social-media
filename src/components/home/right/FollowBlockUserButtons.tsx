"use client";

import { switchFollow } from "@/lib/actions";
import { useState } from "react";

const FollowBlockUserButtons = ({
  userId,
  currentUserId,
  isBlocked,
  isFollowing,
  isFollowRequestSent,
}: {
  userId: string;
  currentUserId: string;
  isBlocked: boolean;
  isFollowing: boolean;
  isFollowRequestSent: boolean;
}) => {
  const [userState, setUserState] = useState({
    isBlocked: isBlocked,
    isFollowing: isFollowing,
    isFollowRequestSent: isFollowRequestSent,
  });

  const follow = async () => {
    try {
      await switchFollow(userId, currentUserId);
      setUserState((prev) => ({
        ...prev,
        isFollowing: prev.isFollowing && false,
        isFollowRequestSent:
          !prev.isFollowing && prev.isFollowRequestSent ? false : true,
      }));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="w-full flex items-center flex-col gap-2">
      <form action={follow} className="w-full">
        <button
          type="submit"
          className="w-full p-1 flex items-center justify-center bg-blue-500 text-white border-none rounded-md hover:bg-blue-600 transition-colors duration-300"
        >
          {userState.isFollowing
            ? "Following"
            : userState.isFollowRequestSent
            ? "Requested"
            : "Follow"}
        </button>
      </form>
      <form action="" className="w-full flex justify-end">
        <button
          type="submit"
          className="text-xs text-red-700 flex items-center justify-center bg-transparent border-none"
        >
          {userState.isBlocked ? "Unblock" : "Block"}
        </button>
      </form>
    </div>
  );
};

export default FollowBlockUserButtons;
