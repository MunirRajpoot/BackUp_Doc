import React from 'react';
import "./login.css";
import Image from 'next/image';
import Link from 'next/link';

const Page = () => {
    return (
        <div className="page-container">
            <div className="login-box">
                <Image src="/icons/backupdoc-logo.png" alt="logo" width={150} height={150} className="logo" />
                <h3 className='well-back'>Welcome Back</h3>
                
                <button className='google-btn'><Image src="/icons/google.png" height={50} width={50} alt='google-logo' /></button>
                <div className="divider">
                    <span>Or</span>
                </div>

                <form className="login-form">

                    <div className="input-group">
                        <label>Email address</label>
                        <input
                            type="email"
                            id="email"
                            className="form-control"
                            placeholder="Enter your email address"
                        />
                    </div>

                    <div className="input-group">
                        <label>Password</label>
                        <input
                            type="password"
                            id="password"
                            className="form-control"
                            placeholder="Enter your password"
                        />
                    </div>

                    <div className='checkbox-group'>
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" value="" id="checkDefault" />
                            <label class="form-check-label" for="checkDefault">
                                Remember me
                            </label>
                        </div>

                        <div>
                            <Link href="/forgot-password" className="forgot-password">Forgot Password?</Link>
                        </div>
                    </div>

                    <div className='button-group'>
                        <button type="submit" className="btn btn-primary signin-btn">Sign In</button>
                        <p className="register-text">Don't have an account? <Link href="/register" className="register-link">Register</Link></p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Page;
