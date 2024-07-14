"use client";

import { switchFollow, switchBlock } from "@/lib/actions";
import { useOptimistic, useState } from "react";
import { useRouter } from "next/navigation";
import BlockModel from "@/components/models/BlockModel";
import { toast } from "react-toastify";

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
  // get router from next/navigation
  const router = useRouter();

  // define states
  const [blockClicked, setBlockClicked] = useState(false);
  const [blockedLoading, setBlockedLoading] = useState(false);
  const [userState, setUserState] = useState({
    isBlocked: isBlocked,
    isFollowing: isFollowing,
    isFollowRequestSent: isFollowRequestSent,
  });

  // Follow user function
  const follow = async () => {
    switchOptimisticFollow("");
    try {
      await switchFollow(userId, currentUserId);
      setUserState((prev) => ({
        ...prev,
        isFollowing: prev.isFollowing && false,
        isFollowRequestSent:
          !prev.isFollowing && !prev.isFollowRequestSent ? true : false,
      }));
    } catch (err) {
      toast.error("Something went wrong, try again later.");
      console.log(err);
    }
  };

  // Optimistic UI for follow
  const [optimisticFollow, switchOptimisticFollow] = useOptimistic(
    userState,
    (prev) => ({
      ...prev,
      isFollowing: prev.isFollowing && false,
      isFollowRequestSent:
        !prev.isFollowing && !prev.isFollowRequestSent ? true : false,
    })
  );

  return (
    <div className="w-full flex items-center flex-col gap-2">
      <form action={follow} className="w-full">
        <button
          type="submit"
          className="w-full p-1 flex items-center justify-center bg-blue-500 text-white border-none rounded-md hover:bg-blue-600 transition-colors duration-300"
        >
          {optimisticFollow.isFollowing
            ? "Following"
            : optimisticFollow.isFollowRequestSent
            ? "Requested"
            : "Follow"}
        </button>
      </form>
      <button
        type="button"
        onClick={() => setBlockClicked(true)}
        className="text-xs text-red-700 self-end flex items-center justify-center bg-transparent border-none"
      >
        {userState.isBlocked ? "Unblock" : "Block"}
      </button>
      {blockClicked && (
        <BlockModel
          setBlockClicked={setBlockClicked}
          setBlockedLoading={setBlockedLoading}
          setUserState={setUserState}
          blockedLoading={blockedLoading}
          userId={userId}
          currentUserId={currentUserId}
        />
      )}
    </div>
  );
};

export default FollowBlockUserButtons;
