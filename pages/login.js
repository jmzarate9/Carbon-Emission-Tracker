import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { signInWithEmailAndPassword } from "firebase/auth";
import { firebaseAuth } from "../firebase-config/config";
import loginStyles from "@/styles/Login.module.css";

const Login = () => {
    const router = useRouter();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState('');

    const loginUser = async (e) => {
        try {
            e.preventDefault();
            setErrorMessage("");
            await signInWithEmailAndPassword(firebaseAuth, email, password);
            router.push('/');
        } catch (error) {
            setErrorMessage(error?.message ?? 'Failed to log in');
        }
    }
    

    return (
        <div className={loginStyles.outerContainer}>
            <div className={loginStyles.innerContainer}>
                <div className={loginStyles.content}>
                    <form className={loginStyles.form}>
                    <h2>Log In</h2>
                        <div className={loginStyles.formGroup}>
                            <label htmlFor="Email">Email</label>
                            <input 
                                className={loginStyles.input} 
                                placeholder="email@example.com" 
                                type="email" 
                                id="email" 
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className={loginStyles.formGroup}>
                            <label htmlFor="password">Password</label>
                            <input 
                                className={loginStyles.input} 
                                placeholder="Password" 
                                type="password" 
                                id="password" 
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        {errorMessage.length > 0 ? <p>{errorMessage}</p> : <></>}
                        <button onClick={loginUser} type="submit" className={loginStyles.loginButton}>
                        Sign In
                        </button>
                        <p>Don't have an account? <Link className={loginStyles.hyperlink} href="/register">Register Now</Link></p>
                    </form>
                    <blockquote className={loginStyles.blockquote}>
                        The first step in reducing carbon emissions is knowing where you stand. 
                        Our tracking software empowers you to make informed choices for a better tomorrow.
                    </blockquote>
                </div>
            </div>
        </div>
    );
}

export default Login;

//DONE // TODO: if the user press the "Sign In" button they should be redirected to the home page
//TODO: if the user already signed in, remove the "get started" button and change it to sign out
//TODO: if the user cant access the "estimates" if they are not signed in or registered.
//TODO: create a swal or any similar to sweetalert
//TODO: Also show the necessary information like (email, password not found or match)