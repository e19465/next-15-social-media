import SinglePost from "./SinglePost";

const PostFeed = () => {
  return (
    <div className="p-4 bg-white rounded-lg flex flex-col gap-8 shadow-md mt-4">
      <SinglePost />
      <SinglePost />
      <SinglePost />
    </div>
  );
};

export default PostFeed;
