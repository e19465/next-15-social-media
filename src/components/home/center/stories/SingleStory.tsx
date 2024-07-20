import { Story, User } from "@prisma/client";
import Image from "next/image";

type StoryWithUser = Story & { user: User };

const SingleStory = ({ story }: { story: StoryWithUser }) => {
  return (
    <div className="flex-shrink-0 flex flex-col items-center gap-2 cursor-pointer">
      <div className="relative w-20 h-20">
        <Image
          src={story.img!}
          alt="user story image"
          priority
          width={80}
          height={80}
          className="w-full h-full object-cover rounded-full ring-2 ring-offset-2"
        />
      </div>
      <span className="font-medium">{story.user.username}</span>
    </div>
  );
};

export default SingleStory;
