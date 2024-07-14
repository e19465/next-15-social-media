"use client";

import { switchFollow } from "@/lib/actions";
import { useOptimistic, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const UnfollowButton = ({
  userId,
  currentUserId,
  isFollowing,
  isFollowRequestSent,
}: {
  userId: string;
  currentUserId: string;
  isFollowing: boolean;
  isFollowRequestSent: boolean;
}) => {
  // get router from next/navigation
  const router = useRouter();

  // define states
  const [userState, setUserState] = useState({
    isFollowing: isFollowing,
    isFollowRequestSent: isFollowRequestSent,
  });

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

  return (
    <div
      className="w-[100px]"
      title={
        optimisticFollow.isFollowing
          ? "Unfollow"
          : optimisticFollow.isFollowRequestSent
          ? "Cancel request"
          : "Follow"
      }
    >
      <form action={follow} className="w-full">
        <button
          type="submit"
          className="w-full p-1 flex items-center justify-center bg-blue-500 text-white border-none rounded-md hover:bg-blue-600 transition-colors duration-300 text-sm"
        >
          {optimisticFollow.isFollowing
            ? "Following"
            : optimisticFollow.isFollowRequestSent
            ? "Requested"
            : "Follow"}
        </button>
      </form>
    </div>
  );
};

export default UnfollowButton;
