import Image from "next/image";
import LOADING_IMG_GIF from "../../public/loading.gif";

const Loading = () => {
  return (
    <section className="fixed top-0 left-0 z-[1000] w-full h-screen flex flex-col items-center justify-center">
      <Image
        src={LOADING_IMG_GIF}
        alt="loading image"
        priority
        className="w-[300px] h-[300px] object-contain"
      />
    </section>
  );
};

export default Loading;
