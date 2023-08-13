import React, { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Navbar from '/components/Navbar'
import { createUserWithEmailAndPassword } from "firebase/auth";
import Swal from 'sweetalert2';
import { firebaseAuth } from "../firebase-config/config";
import useAuth from "@/components/auth";
import registerStyles from "@/styles/Register.module.css";

const Register = () => {
    
    const router = useRouter();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState('');

    const registerUser = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            Swal.fire({
                icon: 'error',
                title: 'Passwords Do Not Match',
                text: 'Please make sure the passwords match.',
                confirmButtonText: 'OK'
            });
            return;
        }

        if (password.length < 6) {
            Swal.fire({
                icon: 'error',
                title: 'Password Too Short',
                text: 'Password should be at least 6 characters long.',
                confirmButtonText: 'OK'
            });
            return;
        }

        try {
            await createUserWithEmailAndPassword(firebaseAuth, email, password);
            Swal.fire({
                icon: 'success',
                title: 'Successfully Registered!',
                showConfirmButton: false,
                timer: 2000
            }).then(() => {
                router.push('/');
            });
        } catch (error) {
            if (error.code === 'auth/invalid-email') {
                Swal.fire({
                    icon: 'error',
                    title: 'Invalid Email',
                    text: 'Please enter a valid email address.',
                    confirmButtonText: 'OK'
                });
            } else if (error.code === 'auth/email-already-in-use') {
                Swal.fire({
                    icon: 'error',
                    title: 'Email Already Exists',
                    text: 'The email address is already registered.',
                    confirmButtonText: 'OK'
                });
            } else {
                console.error(error);
                Swal.fire({
                    icon: 'error',
                    title: 'Registration Failed',
                    text: 'An error occurred during registration. Please try again later.',
                    confirmButtonText: 'OK'
                });
            }
        }
    };

    useAuth();


    return (
        <>

            <Navbar />
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
                            <button onClick={registerUser} className={registerStyles.registerButton}>Sign Up</button>
                            <p>Already have an account? <Link className={registerStyles.hyperlink} href="/login">Log in</Link></p>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Register;
