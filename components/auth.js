import { useEffect } from "react";
import { useRouter } from "next/router";
import { onAuthStateChanged } from "firebase/auth";
import { firebaseAuth } from "../firebase-config/config";

const useAuth = () => {
    const router = useRouter();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(firebaseAuth, (user) => {
        if (user) {
            // User is authenticated, redirect to home page when accessing register and login
            if (router.pathname === "/register" || router.pathname === "/login") {
            router.push("/");
            }
        } else {
            // User is not authenticated, restrict access to some routes
            if (router.pathname.startsWith("/estimates")) {
            router.push("/login");
            }
        }
        });

        return () => unsubscribe();
    }, []);
};

export default useAuth;





