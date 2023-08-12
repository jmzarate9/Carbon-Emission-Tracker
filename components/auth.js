import { useEffect } from "react";
import { useRouter } from "next/router";
import { onAuthStateChanged } from "firebase/auth";
import { firebaseAuth } from "../firebase-config/config";

const useAuth = () => {
    const router = useRouter();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(firebaseAuth, (user) => {
        if (user) {
            if (router.pathname === "/register" || router.pathname === "/login") {
            router.push("/");
            }
        } else {
            if (router.pathname.startsWith("/estimates")) {
            router.push("/login");
            }
        }
        });

        return () => unsubscribe();
    }, []);
};

export default useAuth;





