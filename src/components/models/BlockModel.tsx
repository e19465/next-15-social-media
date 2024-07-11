import { switchBlock } from "@/lib/actions";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

interface BlockModelProps {
  setBlockClicked: React.Dispatch<React.SetStateAction<boolean>>;
  setBlockedLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setUserState: React.Dispatch<
    React.SetStateAction<{
      isBlocked: boolean;
      isFollowing: boolean;
      isFollowRequestSent: boolean;
    }>
  >;
  blockedLoading: boolean;
  userId: string;
  currentUserId: string;
}

const BlockModel: React.FC<BlockModelProps> = ({
  setBlockClicked,
  setBlockedLoading,
  setUserState,
  blockedLoading,
  userId,
  currentUserId,
}) => {
  // get router from next/navigation
  const router = useRouter();

  // Block user function (action)
  const block = async (e: React.FormEvent) => {
    e.preventDefault();
    setBlockedLoading(true);
    try {
      const res = await switchBlock(userId, currentUserId);
      setUserState((prev) => ({
        ...prev,
        isBlocked: !prev.isBlocked,
      }));
      setBlockedLoading(false);
      setBlockClicked(false);
      if (res == "blocked") {
        router.push("/");
        toast.success("Blocked");
      }
    } catch (err) {
      toast.error("Failed to block, try again later.");
      setBlockedLoading(false);
      console.log(err);
    }
  };

  return (
    <section
      className="w-full h-screen z-[999] fixed top-0 left-0 bg-[rgba(255,255,255,0.5)] flex items-center justify-center"
      onClick={() => setBlockClicked(false)}
    >
      <form
        onSubmit={block}
        className="w-[250px] sm:w-[400px] h-[180px]  rounded-md flex items-center justify-center flex-col bg-[#1a1a2e] p-2 shadow-md shadow-blue-900"
        onClick={(e) => e.stopPropagation()}
      >
        <p className="pl-4 w-full text-red-500 text-left text-lg">
          Are you sure?
        </p>
        <p className="pl-4 w-full text-gray-200 text-left text-sm my-2">
          After you blocked this user you don&apos;t get any updates from this
          user. If you really need to block this user, press confirm.
        </p>
        <div className="mt-[10px] w-full h-auto flex items-center justify-end gap-2 pr-4">
          <button
            type="button"
            className="
            p-2 bg-transparent border border-red-500 text-red-500 rounded-md hover:bg-red-500 hover:text-white transition-colors duration-300"
            onClick={() => setBlockClicked(false)}
          >
            cancel
          </button>
          <button
            type="submit"
            className={`p-2  rounded-md border border-white text-white ${
              blockedLoading && "cursor-not-allowed opacity-50"
            } hover:bg-white hover:text-black transition-colors duration-300`}
            disabled={blockedLoading}
          >
            {blockedLoading ? "loading..." : "confirm"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default BlockModel;
