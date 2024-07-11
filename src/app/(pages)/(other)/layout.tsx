import Navbar from "@/components/navbar/Navbar";
import NProgressDoneComponent from "@/components/nprogress/NProgressDoneComponent";

export const metadata = {
  title: "SDSOCIAL",
  description: "sdsocial is a social media platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="w-full h-screen" lang="en" suppressHydrationWarning>
      <NProgressDoneComponent />
      <div className="w-full h-screen flex flex-col">
        <div className="w-full h-20 bg-white px-2 sm:px-4 lg:px-8 border-b border-gray-200">
          <Navbar />
        </div>
        <div className="flex-1 bg-slate-100 px-2 sm:px-4 md:px-8 lg:px-16 xl:px-16 2xl:px-32 overflow-y-auto">
          {children}
        </div>
      </div>
    </main>
  );
}
