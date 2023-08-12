import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Navbar from '/components/Navbar';
import { signInWithEmailAndPassword } from "firebase/auth";
import { firebaseAuth } from "../firebase-config/config";
import Swal from 'sweetalert2';
import useAuth from "@/components/auth";
import loginStyles from "@/styles/Login.module.css";


const Login = () => {
    const router = useRouter();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState('');

    const loginUser = async (e) => {
        e.preventDefault();
        setErrorMessage("");
        try {
            await signInWithEmailAndPassword(firebaseAuth, email, password);
            router.push('/');

            Swal.fire({
                icon: 'success',
                title: 'Successfully Logged In!',
                showConfirmButton: false,
                timer: 1500
            });
        } catch (error) {
            const errorCode = error.code;
            if (errorCode === 'auth/invalid-email' || errorCode === 'auth/user-not-found') {
                Swal.fire({
                    icon: 'error',
                    title: 'Invalid Email',
                    text: 'The email address you entered is incorrect.',
                    showConfirmButton: false,
                    timer: 2000
                });
            } else if (errorCode === 'auth/wrong-password') {
                Swal.fire({
                    icon: 'error',
                    title: 'Incorrect Password',
                    text: 'The password you entered is incorrect.',
                    showConfirmButton: false,
                    timer: 2000
                });
            } else {
                setErrorMessage(error?.message ?? 'Failed to log in');
            }
        }
    }
    
    useAuth();
    

    return (
        <>
            <Navbar />
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
                            <button onClick={loginUser} type="submit" className={loginStyles.loginButton}>
                            Sign In
                            </button>
                            <p>Don't have an account? <Link className={loginStyles.hyperlink} href="/register">Register Now</Link></p>
                        </form>
                        <blockquote className={loginStyles.blockquote}>
                        Change starts with awareness. Our emissions tracker cultivates mindfulness about your environmental impact.
                        </blockquote>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Login;
