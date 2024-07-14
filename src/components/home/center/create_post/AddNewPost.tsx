import Image from "next/image";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/client";
import CreatePostInteraction from "./CreatePostInteraction";

const AddNewPost = async () => {
  const { userId } = auth();
  if (!userId) return null;

  const currentUser = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!currentUser) return null;

  return (
    <div className="p-4 bg-white rounded-lg flex gap-4 justify-between text-sm shadow-md mt-4">
      {/* AVATAR */}
      <Image
        src={currentUser.avatar || "/noAvatar.png"}
        alt="add post image"
        width={48}
        height={48}
        className="w-12 h-12 object-cover rounded-full hidden sm:block"
      />
      {/* CREATE POST */}
      <CreatePostInteraction currentUser={currentUser} />
    </div>
  );
};

export default AddNewPost;
