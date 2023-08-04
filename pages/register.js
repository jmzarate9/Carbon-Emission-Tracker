import React from "react";
import Link from "next/link";
import registerStyles from "@/styles/Register.module.css";

const Register = () => {

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
                            />
                        </div>
                        <div className={registerStyles.formGroup}>
                            <label htmlFor="password">Password</label>
                            <input 
                                className={registerStyles.input} 
                                placeholder="Password" 
                                type="password" 
                                id="password" 
                            />
                        </div>
                        <div className={registerStyles.formGroup}>
                            <label htmlFor="confirmPassword">Confirm Password</label>
                            <input 
                                className={registerStyles.input} 
                                placeholder="Confirm password" 
                                type="password" 
                                id="confirmPassword" 
                                />
                        </div>
                        <button type="submit" className={registerStyles.registerButton}>
                        Sign Up
                        </button>
                        <p>Already have an account? <Link className={registerStyles.hyperlink} href="/login">Log in</Link></p>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Register;

//TODO: if the user press the "Sign Up" button they should be redirected to the login page