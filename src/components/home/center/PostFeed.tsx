import SinglePost from "./SinglePost";
import { prisma } from "@/lib/client";
import { auth } from "@clerk/nextjs/server";

type LocationProps = {
  location: "home" | "profile";
};

const PostFeed: React.FC<LocationProps> = ({ location }) => {
  const { userId } = auth();

  const getPostsForFeed = async () => {
    // If the location is home, fetch all posts from my followings and display them
    if (location === "home") {
      if (!userId) return null;
      const usersImFollowing = await prisma.follower.findMany({
        where: {
          followingId: userId,
        },
        select: {
          followerId: true,
        },
      });

      const userIdsOfUsersImFollowing = usersImFollowing.map(
        (user) => user.followerId
      );

      const followingsPosts = await prisma.post.findMany({
        where: {
          userId: {
            in: userIdsOfUsersImFollowing,
          },
        },
        include: {
          user: true,
          likes: {
            select: {
              userId: true,
            },
          },
          _count: {
            select: {
              comments: true,
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      });

      return (
        <>
          {followingsPosts?.length !== 0 ? (
            followingsPosts.map((post) => (
              <SinglePost post={post} key={post.id} />
            ))
          ) : (
            <p className="p-5 text-base text-gray-500">
              Ooops! Thre is no posts yet! ☹️
            </p>
          )}
        </>
      );
    }

    // If the location is profile, fetch all posts from the database and display them
    if (location === "profile") {
      if (!userId) return null;
      const userPosts = await prisma.post.findMany({
        where: {
          userId: userId!,
        },
        include: {
          user: true,
          likes: {
            select: {
              userId: true,
            },
          },
          _count: {
            select: {
              comments: true,
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      });

      return (
        <>
          {userPosts?.length !== 0 ? (
            userPosts.map((post) => <SinglePost post={post} key={post.id} />)
          ) : (
            <p className="text-center p-5 text-xl text-gray-500">
              Ooops! you don't made a post yet! ☹️
            </p>
          )}
        </>
      );
    }
  };

  return (
    <div className="p-4 bg-white rounded-lg flex flex-col gap-8 shadow-md mt-4">
      {getPostsForFeed()}
    </div>
  );
};

export default PostFeed;
