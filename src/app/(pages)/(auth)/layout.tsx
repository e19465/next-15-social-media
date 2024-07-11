export const metadata = {
  title: "SDSOCIAL | Authentication Layout",
  description: "Authentication page layout for SDSOCIAL",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="w-full h-[100vh]" lang="en" suppressHydrationWarning>
      <div className="w-full h-[100vh] overflow-auto flex items-center justify-center">
        {children}
      </div>
    </main>
  );
}
