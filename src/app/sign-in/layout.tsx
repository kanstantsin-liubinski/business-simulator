import { SessionProvider } from "next-auth/react";
import { auth } from "auth/auth";
import AppLoader from "hoc/app-loader";

export default async function SignInLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  return (
    <SessionProvider session={session}>
      <AppLoader>
        {children}
      </AppLoader>
    </SessionProvider>
  );
}
