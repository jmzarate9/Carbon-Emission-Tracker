import React, { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { firebaseAuth } from "../firebase-config/config";
import registerStyles from "@/styles/Register.module.css";

const Register = () => {
    const router = useRouter();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState('');

    const registerUser = async (e) => {
        try {
            e.preventDefault();
            setErrorMessage("");
            await createUserWithEmailAndPassword(firebaseAuth, email, password);
            router.push('/login');
        } catch (error) {
            setErrorMessage(error?.message ?? 'Failed to register');
        }

        // if (password !== confirmPassword) {
        //     setErrorMessage('Password not match');
        // } else {
        //     setErrorMessage('Password match');
        // }
    }


    return (
        <div className={registerStyles.outerContainer}>
            <div className={registerStyles.innerContainer}>
                <div className={registerStyles.content}>
                    <blockquote className={registerStyles.blockquote}>
                        The first step in reducing carbon emissions is knowing where you stand. 
                        Our tracking software empowers you to make informed choices for a better tomorrow.
                    </blockquote>
                    <form>
                    <h2>Register</h2>
                        <div className={registerStyles.formGroup}>
                            <label htmlFor="Email">Email</label>
                            <input 
                                className={registerStyles.input} 
                                placeholder="email@example.com" 
                                type="email" 
                                id="email" 
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className={registerStyles.formGroup}>
                            <label htmlFor="password">Password</label>
                            <input 
                                className={registerStyles.input} 
                                placeholder="Password" 
                                type="password" 
                                id="password" 
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <div className={registerStyles.formGroup}>
                            <label htmlFor="confirmPassword">Confirm Password</label>
                            <input 
                                className={registerStyles.input} 
                                placeholder="Confirm password" 
                                type="password" 
                                id="confirmPassword" 
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                                />
                        </div>
                        {errorMessage.length > 0 ? <p>{errorMessage}</p> : <></>}
                        {/* {errorMessage && <p className={registerStyles.errorMessage}>{errorMessage}</p>} */}
                        <button onClick={registerUser} className={registerStyles.registerButton}>Sign Up</button>
                        <p>Already have an account? <Link className={registerStyles.hyperlink} href="/login">Log in</Link></p>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Register;

//TODO: if the user press the "Sign Up" button they should be redirected to the login page