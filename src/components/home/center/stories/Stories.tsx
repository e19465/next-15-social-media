import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/client";
import StoryList from "./StoryList";

const Stories = async () => {
  const { userId: currentUserId } = auth();
  if (!currentUserId) return null;

  const currentUser = await prisma.user.findUnique({
    where: {
      id: currentUserId,
    },
  });
  if (!currentUser) return null;

  // get stories of the current user and the users they follow within the last 24 hours
  const stories = await prisma.story.findMany({
    where: {
      createdAt: {
        gte: new Date(Date.now() - 24 * 60 * 60 * 1000),
      },
      OR: [
        {
          user: {
            followers: {
              some: {
                followingId: currentUserId,
              },
            },
          },
        },
        {
          userId: currentUserId,
        },
      ],
    },
    include: {
      user: true,
    },
  });

  return (
    <div className="relative p-4 bg-white rounded-lg shadow-md text-xs">
      <div className="flex gap-6 custom-small-horizontal-scrollbar p-2">
        <StoryList stories={stories} currentUser={currentUser} />
      </div>
    </div>
  );
};

export default Stories;
