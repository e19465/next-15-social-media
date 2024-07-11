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
      const existingFollowRequest = await prisma.followRequest.findFirst({
        where: {
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
        await prisma.followRequest.create({
          data: {
            senderId: currentUserId,
            recieverId: userId,
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

//! function to accept follow request
export const acceptFollowRequest = async (
  senderId: string,
  currentUserId: string
) => {
  if (!currentUserId)
    throw new Error("You must be logged in to accept follow requests.");
  if (!senderId)
    throw new Error("You must provide a user to accept follow request.");
  if (senderId === currentUserId)
    throw new Error("You can't accept follow request from yourself.");

  try {
    //! Check if the currentUser has recieved a follow request from the sender
    const existingFollowRequest = await prisma.followRequest.findFirst({
      where: {
        senderId: senderId,
        recieverId: currentUserId,
      },
    });

    //! If the currentUser has recieved a follow request from the sender, delete the follow request and create a follower record
    if (existingFollowRequest) {
      await prisma.followRequest.delete({
        where: {
          id: existingFollowRequest.id,
        },
      });

      await prisma.follower.create({
        data: {
          followerId: currentUserId,
          followingId: senderId,
        },
      });

      return "accepted";
    } else {
      throw new Error("No follow request found.");
    }
  } catch (err) {
    console.log(err);
    throw new Error("Something went wrong. Please try again later.");
  }
};

//! Function to reject follow request
export const rejectFollowRequest = async (
  senderId: string,
  currentUserId: string
) => {
  if (!currentUserId)
    throw new Error("You must be logged in to reject follow requests.");
  if (!senderId)
    throw new Error("You must provide a user to reject follow request.");
  if (senderId === currentUserId)
    throw new Error("You can't reject follow request from yourself.");

  try {
    //! Check if the currentUser has recieved a follow request from the sender
    const existingFollowRequest = await prisma.followRequest.findFirst({
      where: {
        senderId: senderId,
        recieverId: currentUserId,
      },
    });

    //! If the currentUser has recieved a follow request from the sender, delete the follow request
    if (existingFollowRequest) {
      await prisma.followRequest.delete({
        where: {
          id: existingFollowRequest.id,
        },
      });

      return "rejected";
    } else {
      throw new Error("No follow request found.");
    }
  } catch (err) {
    console.log(err);
    throw new Error("Something went wrong. Please try again later.");
  }
};

//! Function to update user cover photo
export const updateUserCoverPhoto = async (
  userId: string,
  coverPhoto: string
) => {
  if (!userId)
    throw new Error("You must be logged in to update your cover photo.");

  try {
    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        cover: coverPhoto,
      },
    });
    return "updated";
  } catch (err) {
    console.log(err);
    throw new Error("Something went wrong. Please try again later.");
  }
};

//! Function to update user information
export const updateUserInformation = async (userId: string, data: any) => {
  if (!userId)
    throw new Error("You must be logged in to update your information.");

  try {
    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        ...data,
      },
    });
    return "updated";
  } catch (err) {
    console.log(err);
    throw new Error("Something went wrong. Please try again later.");
  }
};
