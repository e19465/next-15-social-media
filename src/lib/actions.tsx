"use server";
import { prisma } from "./client";

//! Function to follow / unfollow / send follow request / remove follow request
export const switchFollow = async (userId: string, currentUserId: string) => {
  if (!currentUserId) throw new Error("You must be logged in to follow users.");
  if (!userId) throw new Error("You must provide a user to follow.");
  if (userId === currentUserId) throw new Error("You can't follow yourself.");

  try {
    //! Check if the user is already following the user
    const existingFollow = await prisma.follower.findFirst({
      where: {
        followerId: currentUserId,
        followingId: userId,
      },
    });

    //! If the user is already following the user, unfollow them
    if (existingFollow) {
      await prisma.follower.delete({
        where: {
          id: existingFollow.id,
        },
      });
    } else {
      //! If the user is not following the user, check if there is a follow request sent
      const existingFollowRequest = await prisma.followRequest.create({
        data: {
          senderId: currentUserId,
          recieverId: userId,
        },
      });

      //! If there is a follow request sent, delete the follow request
      if (existingFollowRequest) {
        await prisma.followRequest.delete({
          where: {
            id: existingFollowRequest.id,
          },
        });
      } else {
        //! If there is no follow request sent, send a follow request
        await prisma.follower.create({
          data: {
            followerId: currentUserId,
            followingId: userId,
          },
        });
      }
    }
  } catch (err) {
    console.log(err);
    throw new Error("Something went wrong. Please try again later.");
  }
};

//! Function to block / unblock a user
export const switchBlock = async (userId: string, currentUserId: string) => {
  if (!currentUserId) throw new Error("You must be logged in to block users.");
  if (!userId) throw new Error("You must provide a user to block.");
  if (userId === currentUserId) throw new Error("You can't block yourself.");

  try {
    //! Check if the user is already blocked
    const existingBlock = await prisma.blockRequest.findFirst({
      where: {
        blockerId: currentUserId,
        blockedId: userId,
      },
    });

    //! If the user is already blocked, unblock them
    if (existingBlock) {
      await prisma.blockRequest.delete({
        where: {
          id: existingBlock.id,
        },
      });
      return "unblocked";
    } else {
      //! If the user is not blocked, block them
      await prisma.blockRequest.create({
        data: {
          blockerId: currentUserId,
          blockedId: userId,
        },
      });

      //! Check if the currentUser has sent a follow request, if they have, delete the follow request
      await prisma.followRequest.deleteMany({
        where: {
          senderId: currentUserId,
          recieverId: userId,
        },
      });

      //! Check if the currentUser has recieved a follow request, if they have, delete the follow request
      await prisma.followRequest.deleteMany({
        where: {
          senderId: userId,
          recieverId: currentUserId,
        },
      });

      //! Check if the currentUser is following the user, if they are, unfollow them
      await prisma.follower.deleteMany({
        where: {
          followerId: currentUserId,
          followingId: userId,
        },
      });

      //! Check if the user is following the currentUser, if they are, unfollow them
      await prisma.follower.deleteMany({
        where: {
          followerId: userId,
          followingId: currentUserId,
        },
      });

      return "blocked";
    }
  } catch (err) {
    console.log(err);
    throw new Error("Something went wrong. Please try again later.");
  }
};
