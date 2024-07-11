import { Metadata } from "next";
import { SignIn } from "@clerk/nextjs";

export const metadata: Metadata = {
  title: "SD | Social || Sign In",
  description: "Profile page",
};

export default function Page() {
  return <SignIn />;
}
