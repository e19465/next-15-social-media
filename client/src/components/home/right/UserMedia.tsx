import { ProgressLink } from "@/components/nprogress/NProgressHandler";
import Image from "next/image";

const UserMedia = ({ userId }: { userId?: string }) => {
  return (
    <div className="p-4 bg-white rounded-lg flex flex-col gap-4 justify-between text-sm shadow-md">
      {/* TOP */}
      <div className="flex items-center justify-between">
        <span className="font-medium text-gray-500">Media</span>
        <ProgressLink className="text-blue-500 hover:underline" href="#">
          See All
        </ProgressLink>
      </div>

      {/* BOTTOM */}
      <div className="flex flex-wrap gap-4 justify-between">
        <div className="relative w-1/5 h-24">
          <Image
            src="https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=600"
            alt="Media Image"
            fill
            className="rounded-md object-cover"
          />
        </div>
        <div className="relative w-1/5 h-24">
          <Image
            src="https://images.pexels.com/photos/45201/kitty-cat-kitten-pet-45201.jpeg?auto=compress&cs=tinysrgb&w=600"
            alt="Media Image"
            fill
            className="rounded-md object-cover"
          />
        </div>
        <div className="relative w-1/5 h-24">
          <Image
            src="https://images.pexels.com/photos/13287668/pexels-photo-13287668.jpeg?auto=compress&cs=tinysrgb&w=600"
            alt="Media Image"
            fill
            className="rounded-md object-cover"
          />
        </div>
        <div className="relative w-1/5 h-24">
          <Image
            src="https://images.pexels.com/photos/1386604/pexels-photo-1386604.jpeg?auto=compress&cs=tinysrgb&w=600"
            alt="Media Image"
            fill
            className="rounded-md object-cover"
          />
        </div>
        <div className="relative w-1/5 h-24">
          <Image
            src="https://images.pexels.com/photos/1090393/pexels-photo-1090393.jpeg?auto=compress&cs=tinysrgb&w=600"
            alt="Media Image"
            fill
            className="rounded-md object-cover"
          />
        </div>
        <div className="relative w-1/5 h-24">
          <Image
            src="https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=600"
            alt="Media Image"
            fill
            className="rounded-md object-cover"
          />
        </div>
        <div className="relative w-1/5 h-24">
          <Image
            src="https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=600"
            alt="Media Image"
            fill
            className="rounded-md object-cover"
          />
        </div>
        <div className="relative w-1/5 h-24">
          <Image
            src="https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=600"
            alt="Media Image"
            fill
            className="rounded-md object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default UserMedia;
