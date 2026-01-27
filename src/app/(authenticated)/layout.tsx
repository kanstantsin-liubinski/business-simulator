import { redirect } from "next/navigation";
import { auth } from "auth/auth";
import Header from "components/UI/layout/header/header";

export default async function AuthenticatedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Check if user is authenticated
  const session = await auth();
  
  if (!session?.user) {
    redirect("/sign-in");
  }

  return (
    <>
      <Header />
      {children}
    </>
  );
}
