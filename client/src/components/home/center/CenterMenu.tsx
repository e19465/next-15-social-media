import AddNewPost from "./AddNewPost";
import PostFeed from "./PostFeed";
import Stories from "./Stories";

const CenterMenu = () => {
  return (
    <div className="w-full h-calc-100vh-minus-80 p-2 bg-slate-100 shadow-md overflow-auto flex flex-col scrollbar-hide">
      <Stories />
      <AddNewPost />
      <PostFeed />
    </div>
  );
};

export default CenterMenu;
