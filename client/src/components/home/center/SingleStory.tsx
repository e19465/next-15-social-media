import Image from "next/image";

const SingleStory = () => {
  return (
    <div className="flex-shrink-0 flex flex-col items-center gap-2 cursor-pointer">
      <div className="relative w-20 h-20">
        <Image
          src="https://images.pexels.com/photos/3225517/pexels-photo-3225517.jpeg?auto=compress&cs=tinysrgb&w=600"
          alt="user story image"
          priority
          width={80}
          height={80}
          className="w-full h-full object-cover rounded-full ring-2 ring-offset-2"
        />
      </div>
      <span className="font-medium">rohan</span>
    </div>
  );
};

export default SingleStory;
