"use client";

import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useAuthStore } from "store/auth.store";
import LoadingScreen from "components/UI/LoadingScreen/LoadingScreen";

interface AppLoaderProps {
    children: React.ReactNode;
}

/**
 * AppLoader - Global authentication loader wrapper
 * 
 * Handles authentication state management and displays a loading screen
 * while checking user authentication status. Once auth is verified,
 * middleware handles route protection - components don't need to check auth.
 */
const AppLoader = ({ children }: AppLoaderProps) => {
    const { data: session, status } = useSession();

    const { setAuthState } = useAuthStore();

    useEffect(() => {
        setAuthState(status, session)
    }, [status, session, setAuthState]);

    // Show loading screen while checking authentication
    if (status === "loading") {
        return <LoadingScreen />;
    }

    return <>{children}</>;
}

export default AppLoader