"use server";
import { prisma } from "./client";

//! Function to follow / unfollow / send follow request / remove follow request
export const switchFollow = async (userId: string, currentUserId: string) => {
  if (!currentUserId) throw new Error("You must be logged in to follow users.");
  if (!userId) throw new Error("You must provide a user to follow.");
  //   if (userId === currentUserId) throw new Error("You can't follow yourself.");

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
