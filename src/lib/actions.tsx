"use server";
import { PrismaClient } from "@prisma/client";
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
        followerId: userId,
        followingId: currentUserId,
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
        media: "", // Add the 'media' property with an empty string value
        ...data,
      },
    });
    return "updated";
  } catch (err) {
    console.log(err);
    throw new Error("Something went wrong. Please try again later.");
  }
};

//! Function to like / unlike a post
export const switchLike = async (postId: number, currentUserId: string) => {
  if (!currentUserId) throw new Error("You must be logged in to like posts.");
  if (!postId) throw new Error("You must provide a post to like.");

  try {
    //! Check if the user has already liked the post
    const existingLike = await prisma.like.findFirst({
      where: {
        userId: currentUserId,
        postId: postId,
      },
    });

    //! If the user has already liked the post, unlike it
    if (existingLike) {
      await prisma.like.delete({
        where: {
          id: existingLike.id,
        },
      });
      return "unliked";
    } else {
      //! If the user has not liked the post, like it
      await prisma.like.create({
        data: {
          userId: currentUserId,
          postId: postId,
        },
      });
      return "liked";
    }
  } catch (err) {
    console.log(err);
    throw new Error("Something went wrong. Please try again later.");
  }
};

//! Function to like / dislike a comment
export const switchCommentLikes = async (
  commentId: number,
  currentUserId: string
) => {
  if (!currentUserId)
    throw new Error("You must be logged in to like comments.");
  if (!commentId) throw new Error("You must provide a comment to like.");

  try {
    //! get the existing comment
    const existingComment = await prisma.comment.findUnique({
      where: {
        id: commentId,
      },
      include: {
        likes: {
          where: {
            userId: currentUserId,
          },
        },
      },
    });

    const isUserLiked = existingComment?.likes.length! > 0;

    //! If the user has already liked the comment, unlike it
    if (isUserLiked) {
      const newLikesArray = existingComment?.likes.filter(
        (like) => like.userId !== currentUserId
      );
      await prisma.comment.update({
        where: {
          id: commentId,
        },
        data: {
          likes: {
            set: newLikesArray,
          },
        },
      });
      return "disliked";
    } else {
      //! If the user has not liked the comment, like it
      await prisma.comment.update({
        where: {
          id: commentId,
        },
        data: {
          likes: {
            create: {
              userId: currentUserId,
            },
          },
        },
      });

      return "liked";
    }
  } catch (err) {
    console.log(err);
    throw new Error("Something went wrong. Please try again later.");
  }
};

//! Function to reply to a comment
export const replyToComment = async (
  postId: number,
  commentId: number,
  currentUserId: string,
  reply: string
) => {
  if (!currentUserId)
    throw new Error("You must be logged in to reply to comments.");
  if (!commentId) throw new Error("You must provide a comment to reply.");
  if (!reply) throw new Error("You must provide a reply.");

  try {
    //! Create a new reply
    const replyComment = await prisma.replyComment.create({
      data: {
        commentId: commentId,
        userId: currentUserId,
        postId: postId,
        text: reply,
      },
      include: {
        user: true,
        likes: true,
      },
    });

    const res = replyComment;

    return replyComment;
  } catch (err) {
    console.log(err);
    throw new Error("Something went wrong. Please try again later.");
  }
};

//! Function to like / dislike a reply
export const switchReplyLikes = async (
  replyId: number,
  currentUserId: string
) => {
  if (!currentUserId) throw new Error("You must be logged in to like replies.");
  if (!replyId) throw new Error("You must provide a reply to like.");
  console.log("entered");

  try {
    //! get the existing reply
    const existingReply = await prisma.replyComment.findUnique({
      where: {
        id: replyId,
      },
      include: {
        likes: {
          where: {
            userId: currentUserId,
          },
        },
      },
    });

    const isUserLiked = existingReply?.likes.length! > 0;

    //! If the user has already liked the reply, unlike it
    if (isUserLiked) {
      const newLikesArray = existingReply?.likes.filter(
        (like) => like.userId !== currentUserId
      );
      await prisma.replyComment.update({
        where: {
          id: replyId,
        },
        data: {
          likes: {
            set: newLikesArray,
          },
        },
      });
      return "disliked";
    } else {
      //! If the user has not liked the reply, like it
      await prisma.replyComment.update({
        where: {
          id: replyId,
        },
        data: {
          likes: {
            create: {
              userId: currentUserId,
            },
          },
        },
      });

      return "liked";
    }
  } catch (err) {
    console.log(err);
    throw new Error("Something went wrong. Please try again later.");
  }
};

//! delete comment
export const deleteComment = async (commentId: number) => {
  if (!commentId) throw new Error("You must provide a document to delete.");

  try {
    //! delete the document
    const res = await prisma.comment.delete({
      where: {
        id: commentId,
      },
    });
    if (!res) throw new Error("Document not found.");
    return "deleted";
  } catch (err) {
    console.log(err);
    throw new Error("Something went wrong. Please try again later.");
  }
};

//! delete reply
export const deleteReply = async (replyId: number) => {
  if (!replyId) throw new Error("You must provide a reply to delete.");

  try {
    //! delete the reply
    const res = await prisma.replyComment.delete({
      where: {
        id: replyId,
      },
    });
    if (!res) throw new Error("Reply not found.");
    return "deleted";
  } catch (err) {
    console.log(err);
    throw new Error("Something went wrong. Please try again later.");
  }
};

//! add mew comment
export const addComment = async (
  postId: number,
  currentUserId: string,
  comment: string
) => {
  if (!currentUserId) throw new Error("You must be logged in to comment.");
  if (!postId) throw new Error("You must provide a post to comment.");
  if (!comment) throw new Error("You must provide a comment.");

  try {
    //! Create a new comment
    const newComment = await prisma.comment.create({
      data: {
        postId: postId,
        userId: currentUserId,
        text: comment,
      },
      include: {
        user: true,
        likes: true,
        replies: {
          include: {
            user: true,
            likes: true,
          },
        },
        _count: {
          select: {
            likes: true,
          },
        },
      },
    });

    return newComment;
  } catch (err) {
    console.log(err);
    throw new Error("Something went wrong. Please try again later.");
  }
};

//! create new post
export const createNewPost = async (
  currentUserId: string,
  description: string,
  img: string
) => {
  if (!currentUserId) throw new Error("You must be logged in to post.");

  try {
    //! Create a new post
    await prisma.post.create({
      data: {
        userId: currentUserId,
        description: description,
        img: img,
      },
    });
    return "created";
  } catch (err) {
    console.log(err);
    throw new Error("Something went wrong. Please try again later.");
  }
};

//! delete post
export const ownerDeletePost = async (postId: number) => {
  if (!postId) throw new Error("You must provide a post to delete.");

  try {
    //! delete the post
    const res = await prisma.post.delete({
      where: {
        id: postId,
      },
    });
    if (!res) throw new Error("Post not found.");
    return "deleted";
  } catch (err) {
    console.log(err);
    throw new Error("Something went wrong. Please try again later.");
  }
};

//! add new story
export const addNewStory = async (userId: string, img: string) => {
  if (!userId) throw new Error("You must provide a user to add a story.");
  if (!img) throw new Error("You must provide an image to add a story.");

  try {
    //! check for existing story
    const existingStory = await prisma.story.findFirst({
      where: {
        userId: userId,
      },
    });

    //! If there is an existing story, delete it
    if (existingStory) {
      await prisma.story.delete({
        where: {
          id: existingStory.id,
        },
      });
    }

    //! Create a new story
    const story = await prisma.story.create({
      data: {
        userId: userId,
        img: img,
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // Set expiresAt to 24 hours from now
      },
      include: {
        user: true,
      },
    });
    return story;
  } catch (err) {
    console.log(err);
    throw new Error("Something went wrong. Please try again later.");
  }
};
