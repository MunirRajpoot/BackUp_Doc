'use client';

import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { Eye, EyeOff, User } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { setUser } from "@/redux/slice/userSlice";
// import DoctorPhase1 from '@/component/DoctorForm/DoctorPhase1';
import DoctorForm from '@/component/DoctorForm/DoctorForm';

export default function RegisterProcessPage() {
    const searchParams = useSearchParams();
    const defaultEmail = searchParams.get('m') || '';
    const defaultRole = (searchParams.get('role') || 'patient').toLowerCase();

    const [email, setEmail] = useState(defaultEmail);
    const [role, setRole] = useState(defaultRole);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [passwordStrength, setPasswordStrength] = useState('');
    const [passwordMatch, setPasswordMatch] = useState('');

    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
        setValue,
    } = useForm();

    const router = useRouter();
    const dispatch = useDispatch();

    const password = watch('password');
    const confirm_password = watch('confirm_password');

    useEffect(() => {
        setValue('email', email);
        setValue('role', role);
        setPasswordStrength(checkPasswordStrength(password || ''));
        setPasswordMatch(checkPasswordMatch(password || '', confirm_password || ''));
    }, [email, role, password, confirm_password, setValue]);

    const checkPasswordStrength = (password) => {
        const minLength = /.{8,}/;
        const hasUpperCase = /[A-Z]/;
        const hasLowerCase = /[a-z]/;
        const hasNumber = /[0-9]/;
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/;

        if (
            minLength.test(password) &&
            hasUpperCase.test(password) &&
            hasLowerCase.test(password) &&
            hasNumber.test(password) &&
            hasSpecialChar.test(password)
        ) {
            return 'strong';
        } else if (password.length >= 6) {
            return 'weak';
        } else {
            return 'very weak';
        }
    };

    const checkPasswordMatch = (password, confirm_password) => {
        if (!confirm_password) return '';
        return password === confirm_password ? 'match' : 'mismatch';
    };

    const onSubmit = async (data) => {
        try {
            const formData = new FormData();
            Object.entries(data).forEach(([key, value]) => {
                formData.append(key, value);
            });

            formData.append('role', role);

            const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/account/register`, {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Registration failed');
            }

            const result = await response.json();

            Cookies.set('auth_token', result.token, {
                secure: true,
                sameSite: 'Strict',
                expires: 7,
            });

            dispatch(setUser({
                user: result?.user,
                user_type: result?.user_type || null,
                user_id: result?.user_id || null,
            }));

            router.push(`/`);
        } catch (error) {
            console.error('Registration error:', error.message);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-4 py-4">
            <div className="w-full max-w-md bg-white p-4 rounded-lg shadow-md">
                <div className="flex flex-col items-center mb-4">
                    <div className="bg-blue-600 text-white p-3 rounded-full">
                        <User size={32} />
                    </div>
                    <h2 className="text-2xl text-black font-semibold mt-2 capitalize">
                        Register as {role}
                    </h2>
                </div>

                {role === 'doctor' ? (
                    <DoctorForm />
                ) : (
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" encType="multipart/form-data">
                        <input type="hidden" value={email} {...register('email')} />
                        <input type="hidden" value={role} {...register('role')} />

                        <div className="flex gap-3">
                            <div className="w-1/2">
                                <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                                <input
                                    type="text"
                                    placeholder="First Name"
                                    {...register('first_name', { required: 'First name is required' })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-600 text-black"
                                />
                                {errors.first_name && <p className="text-sm text-red-500 mt-1">{errors.first_name.message}</p>}
                            </div>

                            <div className="w-1/2">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                                <input
                                    type="text"
                                    placeholder="Last Name"
                                    {...register('last_name', { required: 'Last name is required' })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-600 text-black"
                                />
                                {errors.last_name && <p className="text-sm text-red-500 mt-1">{errors.last_name.message}</p>}
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                            <div className="relative">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="Your Password"
                                    {...register('password', {
                                        required: 'Password is required',
                                        minLength: { value: 6, message: 'Minimum 6 characters' },
                                    })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-600 text-black"
                                />
                                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute top-3 right-3 cursor-pointer text-gray-500">
                                    {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
                                </button>
                            </div>
                            {errors.password && <p className="text-sm text-red-500 mt-1">{errors.password.message}</p>}
                            {password && (
                                <p className={`text-sm mt-1 ${passwordStrength === 'strong' ? 'text-green-600' : passwordStrength === 'weak' ? 'text-yellow-600' : 'text-red-600'}`}>
                                    Password strength: {passwordStrength}
                                </p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
                            <div className="relative">
                                <input
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    placeholder="Confirm Password"
                                    {...register('confirm_password', {
                                        required: 'Please confirm your password',
                                        validate: (value) => value === password || 'Passwords do not match',
                                    })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-600 text-black"
                                />
                                <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute top-3 right-3 text-gray-500 cursor-pointer">
                                    {showConfirmPassword ? <Eye size={18} /> : <EyeOff size={18} />}
                                </button>
                            </div>
                            {errors.confirm_password && <p className="text-sm text-red-500 mt-1">{errors.confirm_password.message}</p>}
                            {confirm_password && (
                                <p className={`text-sm mt-1 ${passwordMatch === 'match' ? 'text-green-600' : 'text-red-600'}`}>
                                    {passwordMatch === 'match' ? 'Passwords match' : 'Passwords do not match'}
                                </p>
                            )}
                        </div>

                        <div>
                            <label className="flex items-center text-sm text-gray-700">
                                <input type="checkbox" {...register('terms', { required: 'You must agree to the terms' })} className="mr-2" />
                                I agree to the <a href="#" className="text-blue-600 hover:underline ml-1">terms and conditions</a>
                            </label>
                            {errors.terms && <p className="text-sm text-red-500 mt-1">{errors.terms.message}</p>}
                        </div>

                        <button type="submit" className="w-full py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition cursor-pointer">
                            Sign Up
                        </button>

                        <p className="text-center text-sm text-blue-600 hover:underline cursor-pointer mt-2">
                            <Link href="/register">Change Email</Link>
                        </p>
                    </form>
                )}
            </div>
        </div>
    );
}
